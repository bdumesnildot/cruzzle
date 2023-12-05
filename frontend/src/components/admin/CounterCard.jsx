import PropTypes from "prop-types";

export default function CounterCard({ icon, text, count }) {
  return (
    <div className="w-56 shadow-md rounded-2xl flex flex-col relative">
      <span className="h-10 w-10 absolute top-[-18px] left-[-18px] text-primary-900 fill-current">
        {icon}
      </span>
      <p className="text-black text-2xl pb-2 ml-8 mt-4">{text}</p>
      <p className="text-black text-4xl ml-8 mb-4">{count}</p>
    </div>
  );
}

CounterCard.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
