import Draggable from 'react-draggable';
import { Resizable } from 're-resizable';

const Images = ({image, index}) => {

  return (
    <div className="image-div">
      <Draggable>
        <Resizable
          defaultSize={{
            width: image.width,
            height: image.height,
          }}
          style={{
            background: `url(${image.url})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
          lockAspectRatio={true}
        ></Resizable>
      </Draggable>
    </div>
  );

};

export default Images;