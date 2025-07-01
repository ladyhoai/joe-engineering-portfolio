import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function ZoomableFigure({ src, alt, caption }) {
  return (
    <figure className="text-center space-y-2">
      <TransformWrapper>
        <TransformComponent>
          <img src={src} alt={alt} className="max-w-full h-auto mx-auto" />
        </TransformComponent>
      </TransformWrapper>
      {caption && (
        <figcaption className="mt-2 text-white text-lg text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
