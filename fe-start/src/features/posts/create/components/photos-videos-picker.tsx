import { Upload } from "lucide-react";
import { useState } from "react";
import { FileUpload, FileUploadDropzone } from "@/components/ui/file-upload";
import { useCreatePost } from "./create-post-context";
import toast from "react-hot-toast";

export default function PhotosVideosPicker() {
  const { setMedia, nextStep } = useCreatePost();
  const [files, setFiles] = useState<Array<File>>([]);

  const handleFileChange = (newFiles: File[]) => {
    if (newFiles.length === 0) return;

    // 1. Pisahkan file yang valid dan yang terlalu besar
    const validFiles: File[] = [];
    let hasInvalidImage = false;

    newFiles.forEach((file) => {
      if (file.type.startsWith("image") && file.size > 1024 * 1024) {
        hasInvalidImage = true;
      } else {
        validFiles.push(file);
      }
    });

    // 2. Jika ada yang tidak valid, tampilkan toast (Gunakan toast id agar tidak duplikat)
    if (hasInvalidImage) {
      toast.error("Images must be less than 1MB", {
        id: "upload-size-error", // ID unik mencegah toast menumpuk jika dipanggil 2x bersamaan
      });

      // Jika semua file yang dimasukkan ternyata tidak valid, stop di sini
      if (validFiles.length === 0) return;
    }

    // 3. Update state hanya dengan file yang lolos validasi
    setFiles(validFiles);

    setMedia(
      validFiles.map((file) => ({
        src: URL.createObjectURL(file),
        file: file,
        type: file.type.startsWith("image") ? "image" : "video",
      })),
    );

    // 4. Pindah step jika ada file yang berhasil diproses
    nextStep();
  };

  // // Pindahkan seluruh logika dari useEffect ke fungsi handler ini
  // const handleFileChange = (newFiles: File[]) => {
  //   if (newFiles.length === 0) return;

  //   // Validasi ukuran gambar (> 1MB)
  //   const hasInvalidImage = newFiles.some(
  //     (f) => f.type.startsWith("image") && f.size > 1024 * 1024,
  //   );

  //   if (hasInvalidImage) {
  //     toast.error("Images must be less than 1MB");
  //     return; // Berhenti, jangan lanjut ke step berikutnya
  //   }

  //   // Selalu update local state agar UI FileUpload tetap sinkron
  //   setFiles(newFiles);

  //   // Jika semua file lolos validasi (termasuk yang 460KB)
  //   setMedia(
  //     newFiles.map((file) => ({
  //       src: URL.createObjectURL(file),
  //       file: file,
  //       type: file.type.startsWith("image") ? "image" : "video",
  //     })),
  //   );

  //   // Pindah ke step berikutnya dengan aman
  //   nextStep();
  // };

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
