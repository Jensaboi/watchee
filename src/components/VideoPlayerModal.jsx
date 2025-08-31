import React from "react";
import ReactPlayer from "react-player";
import Modal from "../components/ui/Modal";
import Button from "./ui/Button";
import { X } from "lucide-react";

export default function VideoPlayerModal({
  isOpen,
  close,
  open,
  toggle,
  headerText,
  src,
}) {
  return (
    <Modal isOpen={isOpen} close={close}>
      <div className="w-full h-full flex-center">
        <div className="w-full rounded-md bg-bg-100 container max-w-[1024px] aspect-16/9">
          <div className="px-lg py-md flex justify-between items-center">
            <h3>{headerText}</h3>
            <Button onClick={close} variant="icon">
              <X />
            </Button>
          </div>
          <ReactPlayer
            controls
            style={{ width: "100%", height: "100%" }}
            src={src}
          />
        </div>
      </div>
    </Modal>
  );
}
