import cv2
import numpy as np
from pathlib import Path


def align_image(input_path: str, output_path: str) -> dict:
    """
    Align an image using computer vision techniques

    Args:
        input_path: Path to the input image
        output_path: Path to save the aligned image

    Returns:
        Dictionary with success status and metadata
    """
    try:
        img = cv2.imread(input_path)

        if img is None:
            return {
                "success": False,
                "error": "Failed to load image"
            }

        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

        edges = cv2.Canny(gray, 50, 150, apertureSize=3)

        lines = cv2.HoughLines(edges, 1, np.pi / 180, 200)

        if lines is not None and len(lines) > 0:
            angles = []
            for line in lines[:10]:
                rho, theta = line[0]
                angle = np.degrees(theta) - 90
                if -45 < angle < 45:
                    angles.append(angle)

            if angles:
                median_angle = np.median(angles)

                h, w = img.shape[:2]
                center = (w // 2, h // 2)

                rotation_matrix = cv2.getRotationMatrix2D(center, median_angle, 1.0)

                cos = np.abs(rotation_matrix[0, 0])
                sin = np.abs(rotation_matrix[0, 1])

                new_w = int((h * sin) + (w * cos))
                new_h = int((h * cos) + (w * sin))

                rotation_matrix[0, 2] += (new_w / 2) - center[0]
                rotation_matrix[1, 2] += (new_h / 2) - center[1]

                aligned = cv2.warpAffine(img, rotation_matrix, (new_w, new_h),
                                        flags=cv2.INTER_CUBIC,
                                        borderMode=cv2.BORDER_REPLICATE)

                cv2.imwrite(output_path, aligned)

                return {
                    "success": True,
                    "metadata": {
                        "rotation_angle": float(median_angle),
                        "original_size": {"width": w, "height": h},
                        "new_size": {"width": new_w, "height": new_h}
                    }
                }

        cv2.imwrite(output_path, img)
        return {
            "success": True,
            "metadata": {
                "rotation_angle": 0.0,
                "original_size": {"width": img.shape[1], "height": img.shape[0]},
                "message": "No significant alignment needed"
            }
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


def detect_document_corners(image_path: str) -> dict:
    """
    Detect corners of a document in an image for perspective correction

    Args:
        image_path: Path to the input image

    Returns:
        Dictionary with corner coordinates
    """
    try:
        img = cv2.imread(image_path)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        blur = cv2.GaussianBlur(gray, (5, 5), 0)
        edges = cv2.Canny(blur, 75, 200)

        contours, _ = cv2.findContours(edges, cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
        contours = sorted(contours, key=cv2.contourArea, reverse=True)[:5]

        for contour in contours:
            peri = cv2.arcLength(contour, True)
            approx = cv2.approxPolyDP(contour, 0.02 * peri, True)

            if len(approx) == 4:
                return {
                    "success": True,
                    "corners": approx.reshape(4, 2).tolist()
                }

        return {
            "success": False,
            "error": "Could not detect document corners"
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }
