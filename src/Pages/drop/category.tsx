

const Category = () => {
  return (
    <div className="flex items-center w-full cursor-pointer rounded-lg border-gray-300  hover:border-2 border-solid  py-6">
      <div className="left px-3">
        <div className="car_image">
          <img height="88" width="88" src="https://d1a3f4spazzrp4.cloudfront.net/car-types/haloProductImages/v1.1/Black_v1.png"></img>
        </div>
      </div>
      <div className="right w-full px-3 leadin-2 sm:leading-[10px]">
        <div className="heading flex items-center justify-between">
          <div className="flex items-center">
            <h4 className="font-medium text-md sm:text-lg">Hourly</h4>
            <span className="mx-3"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" className="_css-epfsyy _css-eDSBFD"><title>Person multiple</title><g fill="currentColor"><path d="M12 5.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM23 5.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM1 17v6h9V12H6c-2.8 0-5 2.2-5 5zM12 23v-6c0-2.8 2.2-5 5-5h6v11H12z"></path></g></svg></span>
            <span className="text-sm"> 4</span>
          </div>
          <h4 className="font-medium text-md sm:text-lg">NGN 2,520.00</h4>
        </div>
        <div className="details">
          <span className="text-sm text-black">{`Save up to 30% more if shared`}</span><br/>
          <span className="text-sm text-gray-500">{`in 7mins. 03:55PM dropoff`}</span>
        </div>
      </div>
    </div>
  );
}

export default Category;