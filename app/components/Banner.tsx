/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef } from "react";
import {FaPencilAlt} from "react-icons/fa"

interface Banner {
  id: number;
  title: string;
  description: string;
  images: string[];
  buttonText: string;
  templateId: string;
}

const Banner: React.FC<Banner> = ({
  id,
  title,
  description,
  images,
  buttonText,
  templateId,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModal, setIsModal] = React.useState<boolean>(false)

  const populateBanner = (
    canvas: HTMLCanvasElement | null,
    ctx: CanvasRenderingContext2D | null,
    banner: Banner
  ) => {
    // Set text properties
    if (canvas) {
      if (ctx) {
        const bgImg = new Image();
        bgImg.src = `/templates/${templateId}.png`;
        bgImg.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
          ctx.font = "140px Calibri";
          switch (parseInt(templateId)) {
            case 5:
              ctx.fillStyle = "white";
              break;
            case 9:
              ctx.fillStyle = "white";
              break;
            case 1:
              ctx.fillStyle = "orange";
              break;
            case 15:
              ctx.fillStyle = "black";
              break;
          }
          ctx.textAlign = "center";

          // Draw the title
          ctx.fillText(banner.title, canvas.width / 2, 300);

          // Draw the description
          ctx.font = "70px Arial";
          if (parseInt(templateId) == 1) ctx.fillText(banner.description, canvas.width / 2, 480);
          else ctx.fillText(banner.description, canvas.width / 2, 450);

          // Draw the button text
          ctx.font = "80px Arial";
          if (parseInt(templateId) == 1 || parseInt(templateId) == 15) ctx.fillStyle = "black";
          else ctx.fillStyle = "white";
          ctx.fillText(banner.buttonText, canvas.width / 2, canvas.height - 50);
        };
        bgImg.onerror = () => {
          console.error(`Failed to load image /templates/${templateId}.png`);
        };
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (typeof window !== "undefined") {
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          populateBanner(canvas, ctx, {
            id,
            title,
            description,
            images,
            buttonText,
            templateId,
          });
        }
      }
    }
  }, [id, title, description, images, buttonText, templateId, populateBanner]);
  return (
    <>
      <div className="banner-holder relative">
        <canvas
          ref={canvasRef}
          id="banner-canvas"
          className="w-full"
          width={1080}
          height={1080}
        ></canvas>
        <div id="edit-container" className="absolute top-0 w-full h-full">
          <div className="button-container absolute right-1 top-1 w-fit">
            <button className="bg-white p-1.5 rounded-3xl"><FaPencilAlt className="fill-black"/></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
