const ListImage = ({src, alt, image, imageClassName}) => {
  const imageType = !src || src.includes('image_not_available') ? image : src;

  return (
    <img
      className={imageClassName}
      src={imageType}
      alt={alt}/>
  )
}

export default ListImage;