import { useMemo, useState } from "react";
import ExpandIcon from "../assets/chevron-right.svg";
import CollapseIcon from "../assets/chevron-down.svg";

const Autocomplete = () => {
  // label, options, placeholder, default value
  // initial value // TODO: get it dynamically API
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const options = [
    { id: 1, name: "India", code: "IN" },
    { id: 2, name: "Pakistan", code: "PK" },
    { id: 3, name: "America", code: "US" },
    { id: 4, name: "England", code: "GB" },
    { id: 5, name: "Brazil", code: "BR" },
    { id: 6, name: "Netherlands", code: "NL" },
    { id: 7, name: "Russia", code: "RU" },
    { id: 8, name: "Japan", code: "JP" },
    { id: 9, name: "China", code: "CN" },
    { id: 10, name: "Australia", code: "AU" },
    { id: 11, name: "Canada", code: "CA" },
    { id: 12, name: "France", code: "FR" },
    { id: 13, name: "Germany", code: "DE" },
    { id: 14, name: "Italy", code: "IT" },
    { id: 15, name: "Mexico", code: "MX" },
    { id: 16, name: "South Africa", code: "ZA" },
    { id: 17, name: "South Korea", code: "KR" },
    { id: 18, name: "Spain", code: "ES" },
    { id: 19, name: "Sweden", code: "SE" },
    { id: 20, name: "Switzerland", code: "CH" },
  ];

  const label = "County";
  const placeholder = "Country";

  const [isExpanded, setIsExpanded] = useState(false);
  const [country, setCountry] = useState("");
  const [latestOptions, setLatestOptions] = useState(options);

  const handleOptionClick = (e) => {
    const value = e.target.innerText ?? "";
    setCountry(value);
  };

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      if (timer) {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), delay);
      }
    };
  };

  const handleFilterChange = (value) => {
    console.log("value: ", value);
    const newOptions = latestOptions.filter(({ name }) =>
      name.startsWith(value)
    );
    console.log("newOptions: ", newOptions);
    setLatestOptions(newOptions);
  };

  const handle = debounce(handleFilterChange, 1000);

  const renderOptions = useMemo(() => {
    return latestOptions.map(({ id, name, code }) => (
      <div key={`${id} -${code}`} onClick={handleOptionClick}>
        {name}
      </div>
    ));
  }, [latestOptions]);

  const onClick = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const onChange = (e) => {
    console.log("value: ", e.target.value, "id: ", e.target);
    setCountry(e.target.value);
    handle(e.target.value);
  };

  return (
    <>
      <div onClick={onClick}>
        <div
          style={{
            display: "flex",
            height: "2rem",
            position: "relative",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            style={{ height: "100%", flex: "1" }}
            value={country}
            onChange={onChange}
          />
          <img
            src={isExpanded ? CollapseIcon : ExpandIcon}
            className="logo react"
            alt="React logo"
            style={{
              height: "1.5rem",
              position: "absolute",
              right: "0.5rem",
              padding: "0",
            }}
          />
        </div>
        {isExpanded && <div>{renderOptions}</div>}
      </div>
    </>
  );
};

export default Autocomplete;
