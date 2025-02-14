import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SurveyForm = () => {
  const [satisCheckedValue, setSatisCheckedValue] = useState("");
  const [whatCheckedValue, setWhatCheckedValue] = useState("");
  const [badCheckedValue, setBadCheckedValue] = useState("");

  // const checkboxCss =
  //   "appearance-none border border-gray-400 rounded-md h-6 w-6 checked:bg-blue-500 focus:ring-2 focus:ring-blue-500 checked:border-blue-500 checked:text-white text-white";
  //   const checkboxCss = `
  //   appearance-none border border-gray-400 rounded-md h-6 w-6
  //   checked:bg-blue-500 checked:border-blue-500 focus:ring-2
  //   focus:ring-blue-500 relative
  //   before:hidden checked:before:block
  //   before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2
  //   checked:before:content-['V'] checked:before:text-white checked:before:text-lg
  // `;
  const checkboxCss = `
    appearance-none border border-inherit rounded-md h-6 w-6 
    bg-no-repeat bg-center
    checked:bg-[url('https://pildhzxxciaiubihlmpb.supabase.co/storage/v1/object/sign/images/checked.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvY2hlY2tlZC5wbmciLCJpYXQiOjE3Mjk0NzIyNDYsImV4cCI6MTc2MTAwODI0Nn0.VeTJbFAcYbUk-CN6e5HfHpz2MlZGmzTdKkoNzsApmv4&t=2024-10-21T00%3A56%3A57.495Z')] checked:bg-blue-500 checked:border-blue-500 focus:ring-2 
    focus:ring-blue-500
`;

  const supabase = createClient(
    "https://pildhzxxciaiubihlmpb.supabase.co",
    process.env.REACT_APP_SUPABASE_KEY as string
  );

  const handleSatisChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSatisCheckedValue(e.target.value);
    if(e.target.value === "no"){
      setWhatCheckedValue("");
    } else if(e.target.value === "yes"){
      setBadCheckedValue("");
    }
  };

  const handleWhatChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhatCheckedValue(e.target.value);
  };

  const handleBadChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBadCheckedValue(e.target.value);
  };


  const fetchingData = async () => {
    let { data: surveys2, error } = await supabase.from("surveys2").select("*");

    if (error) {
      console.log(error);
    }
  };

  const insertData = async (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" });
    if (satisCheckedValue === "") {
      alert("Please select your experience.");
      return;
    } else if (satisCheckedValue === "yes" && whatCheckedValue === "") {
      alert("Please select what you liked the most.");
      return;
    } else if (satisCheckedValue === "no" && whatCheckedValue !== "") {
      setWhatCheckedValue("");
      return;
    }
    const { data, error } = await supabase
      .from("surveys2")
      .insert([
        { yesorno: satisCheckedValue, bestthing: whatCheckedValue, badthing:badCheckedValue, time: now },
      ]);
    alert("Thank you for your response!");
    window.location.reload();

    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchingData();
  });

  return (
    <form onSubmit={insertData} className="text-center w-full p-10 font-OMP">
      <h2 className="text-2xl p-0 w-full mx-auto">테이블 사용경험 설문</h2>
      <div className="w-2/3 mx-auto text-center mt-[40px]">
        <h4 className="">사용 경험은 만족스러우셨습니까?</h4>
        {/* <div className="mx-auto mt-4 justify-between">
          <input
            type="checkbox"
            id="yes"
            name="experience"
            value="yes"
            className={checkboxCss}
            checked={satisCheckedValue === "yes"}
            onChange={handleSatisChecked}
          />
          <label htmlFor="yes">예</label>
          <input
            type="checkbox"
            id="no"
            name="experience"
            value="no"
            className={checkboxCss}
            checked={satisCheckedValue === "no"}
            onChange={handleSatisChecked}
          />
          <label htmlFor="no">아니오</label>
        </div> */}
        <div className="mx-auto mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="yes"
              name="experience"
              value="yes"
              className={checkboxCss}
              checked={satisCheckedValue === "yes"}
              onChange={handleSatisChecked}
            />
            <label htmlFor="yes" className="ml-2">
              예
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="no"
              name="experience"
              value="no"
              className={checkboxCss}
              checked={satisCheckedValue === "no"}
              onChange={handleSatisChecked}
            />
            <label htmlFor="no" className="ml-2">
              아니오
            </label>
          </div>
        </div>
      </div>
      {satisCheckedValue === "yes" && (
        <div>
          <h4 className="mt-[40px]">어떤점이 가장 마음에 드셨습니까?</h4>
          <div className="mx-auto mt-4 flex justify-between items-center">
            <input
              type="checkbox"
              id="table"
              name="experience"
              value="table"
              className={checkboxCss}
              checked={whatCheckedValue === "table"}
              onChange={handleWhatChecked}
            />
            <label htmlFor="table">테이블기능</label>
            <input
              type="checkbox"
              id="sterilization"
              name="experience"
              value="sterilization"
              className={checkboxCss}
              checked={whatCheckedValue === "sterilization"}
              onChange={handleWhatChecked}
            />
            <label htmlFor="sterilization">살균기능</label>
            <input
              type="checkbox"
              id="advertisement"
              name="experience"
              value="advertisement"
              className={checkboxCss}
              checked={whatCheckedValue === "advertisement"}
              onChange={handleWhatChecked}
            />
            <label htmlFor="advertisement">광고기능</label>
          </div>
        </div>
      )}
      {satisCheckedValue === "no" && (
        <div>
          <h4 className="mt-[40px]">어떤점이 가장 마음에 들지 않았습니까?</h4>
          <div className="mx-auto mt-4 flex justify-between items-center">
            <input
              type="checkbox"
              id="table"
              name="experience"
              value="table"
              className={checkboxCss}
              checked={badCheckedValue === "table"}
              onChange={handleBadChecked}
            />
            <label htmlFor="table">테이블기능</label>
            <input
              type="checkbox"
              id="sterilization"
              name="experience"
              value="sterilization"
              className={checkboxCss}
              checked={badCheckedValue === "sterilization"}
              onChange={handleBadChecked}
            />
            <label htmlFor="sterilization">살균기능</label>
            <input
              type="checkbox"
              id="advertisement"
              name="experience"
              value="advertisement"
              className={checkboxCss}
              checked={badCheckedValue === "advertisement"}
              onChange={handleBadChecked}
            />
            <label htmlFor="advertisement">광고기능</label>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="mt-[50px] bg-sky-500 text-white py-2 px-3 rounded-xl hover:bg-sky-900 hover:scale-110 hover:text-white transition-all shadow-black shadow-lg"
      >
        submit
      </button>
    </form>
  );
};

export default SurveyForm;
