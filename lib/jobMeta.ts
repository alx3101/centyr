interface JobMeta {
  preset: string
  width: number
  height: number
}

export function saveJobMeta(jobId: string, meta: JobMeta): void {
  try {
    localStorage.setItem(`centyr_jm_${jobId}`, JSON.stringify(meta))
  } catch {}
}

export function getJobMeta(jobId: string): JobMeta | null {
  try {
    const raw = localStorage.getItem(`centyr_jm_${jobId}`)
    return raw ? (JSON.parse(raw) as JobMeta) : null
  } catch {
    return null
  }
}
