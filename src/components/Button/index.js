import './index.css';
const Button = (props ) => {
  const { onChangeReport,data,currentReport} = props;
    const onChange = (e) => {
        onChangeReport(e);
    };

    const cls = currentReport === data.toLowerCase() ? `w-m-d-reports-btn change-report`: 'w-m-d-reports-btn';
  return (
    <button className={cls} onClick={onChange}>
      {data}
    </button>
  );
};

export default Button;
