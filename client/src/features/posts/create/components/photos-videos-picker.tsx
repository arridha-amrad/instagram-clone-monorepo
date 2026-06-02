import { Upload } from "lucide-react";
import { useState } from "react";
import { FileUpload, FileUploadDropzone } from "@/components/ui/file-upload";
import { useCreatePost } from "./create-post-context";
import toast from "react-hot-toast";

export default function PhotosVideosPicker() {
  const { setMedia, setStep } = useCreatePost();
  const [files, setFiles] = useState<Array<File>>([]);

  // Pindahkan seluruh logika dari useEffect ke fungsi handler ini
  const handleFileChange = (newFiles: File[]) => {
    // Selalu update local state agar UI FileUpload tetap sinkron
    setFiles(newFiles);

    if (newFiles.length === 0) return;

    // Validasi ukuran gambar (> 1MB)
    const hasInvalidImage = newFiles.some(
      (f) => f.type.startsWith("image") && f.size > 1024 * 1024,
    );

    if (hasInvalidImage) {
      toast.error("Images must be less than 1MB");
      return; // Berhenti, jangan lanjut ke step berikutnya
    }

    // Jika semua file lolos validasi (termasuk yang 460KB)
    setMedia(
      newFiles.map((file) => ({
        src: URL.createObjectURL(file),
        file: file,
        type: file.type.startsWith("image") ? "image" : "video",
      })),
    );

    // Pindah ke step berikutnya dengan aman
    setStep((value) => value + 1);
  };

  return (
    <div className="h-full w-full p-8">
      <FileUpload
        maxFiles={10}
        maxSize={50 * 1024 * 1024}
        className="flex h-full w-full"
        value={files}
        onValueChange={handleFileChange} // <-- Ganti setFiles dengan fungsi handler kita
        multiple
        accept="image/*,video/*"
      >
        <FileUploadDropzone className="min-h-full">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-2xl bg-muted p-6">
              <Upload className="size-12 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">
                Upload your Images and Videos{" "}
              </h3>
              <p className="text-muted-foreground">
                Drag and drop your files here or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Up to 10 files, 50MB each
              </p>
            </div>
          </div>
        </FileUploadDropzone>
      </FileUpload>
    </div>
  );
}
