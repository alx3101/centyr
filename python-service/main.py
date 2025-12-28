from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from align import align_image
import os
from pathlib import Path
import shutil

app = FastAPI(title="Centyr Image Processing Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
PROCESSED_DIR = Path("processed")

UPLOAD_DIR.mkdir(exist_ok=True)
PROCESSED_DIR.mkdir(exist_ok=True)


@app.get("/")
async def root():
    return {"message": "Centyr Image Processing Service", "status": "running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.post("/align")
async def process_image(file: UploadFile = File(...)):
    """
    Process and align an uploaded image
    """
    try:
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")

        file_path = UPLOAD_DIR / file.filename
        processed_path = PROCESSED_DIR / f"aligned_{file.filename}"

        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        result = align_image(str(file_path), str(processed_path))

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result.get("error", "Processing failed"))

        return JSONResponse(content={
            "success": True,
            "message": "Image aligned successfully",
            "original_path": str(file_path),
            "processed_path": str(processed_path),
            "metadata": result.get("metadata", {})
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if file_path.exists():
            os.remove(file_path)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
