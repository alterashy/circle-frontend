import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Send, XSquareIcon } from "lucide-react";
import React, { useRef, useState } from "react";

export const PostForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const handleInputFile = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    }
  };

  const handleRemoveFile = () => {
    setPreviewURL(null);
    inputRef.current!.value = "";
  };

  return (
    <div>
      <div className="flex flex-row gap-2">
        <Avatar className="mr-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Textarea placeholder="What's happening..?" />
        <Input
          id="picture"
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex flex-col gap-1">
          <Button>
            <Send />
          </Button>
          <Button onClick={handleInputFile} variant={"outline"}>
            <ImagePlus className="text-primary" />
          </Button>
        </div>
      </div>
      <div>
        {previewURL && (
          <div className="relative inline-block">
            <Separator className="my-2" />
            <img
              src={previewURL}
              alt="image preview"
              className="w-1/2 h-1/2 object-contain rounded border"
            />
            <Button
              onClick={handleRemoveFile}
              variant={"destructive"}
              size={"icon"}
              className="absolute top-6 left-2"
            >
              <XSquareIcon />
            </Button>
          </div>
        )}
      </div>
      <Separator className="my-4" />
    </div>
  );
};
