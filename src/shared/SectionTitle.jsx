



const SectionTitle = ({heading, subHeading}) => {
  return (
    <div className="text-center xl:mt-20 my-5 xl:mb-16">
      <div className="w-12 h-1 bg-blue-500 mx-auto mb-2"></div>
      <h2 className="lg:text-4xl text-2xl font-bold">{heading}</h2>
      <p className=" mt-2">
       {subHeading}
      </p>
    </div>
  );
};

export default SectionTitle;
