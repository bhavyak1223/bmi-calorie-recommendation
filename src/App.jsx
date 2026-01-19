import React, { useState } from "react";

const App = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activity, setActivity] = useState("1.2");

  const [bmivalue, setBmivalue] = useState("");
  const [message, setMessage] = useState("");
  const [calories, setCalories] = useState("");
  const [error, setError] = useState("");

  const bmiCalculator = () => {
    // 🔹 Validation
    if (!weight || !height || !age) {
      setError("Please fill all fields");
      return;
    }

    if (weight <= 0 || height <= 0 || age <= 0) {
      setError("Values must be greater than zero");
      return;
    }

    setError("");

    // 🔹 BMI Calculation
    const bmi = (weight / (height * height)).toFixed(2);
    setBmivalue(bmi);

    let bmiCategory = "";
    if (bmi < 18.5) bmiCategory = "Underweight";
    else if (bmi < 25) bmiCategory = "Normal weight";
    else if (bmi < 30) bmiCategory = "Overweight";
    else bmiCategory = "Obese";

    setMessage(bmiCategory);

    // 🔹 BMR Calculation (Mifflin–St Jeor)
    let bmr =
      gender === "male"
        ? 10 * weight + 6.25 * (height * 100) - 5 * age + 5
        : 10 * weight + 6.25 * (height * 100) - 5 * age - 161;

    const maintenanceCalories = Math.round(bmr * activity);

    // 🔹 BMI-BASED Calorie Recommendation
    let recommendedCalories = maintenanceCalories;

    if (bmiCategory === "Underweight") {
      recommendedCalories = maintenanceCalories + 400; // gain weight
    } else if (bmiCategory === "Overweight" || bmiCategory === "Obese") {
      recommendedCalories = maintenanceCalories - 400; // lose weight
    }

    setCalories(recommendedCalories);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="md:w-2/8 w-full px-4">
        <h1 className="text-4xl font-bold text-center">
          BMI & Calorie Calculator
        </h1>

        <div className="rounded-2xl bg-gradient-to-r from-zinc-300 to-slate-300 p-8 mt-8 text-black">
          <label className="text-xl font-bold">Age</label>
          <input
            type="number"
            className="bg-gray-800 text-white rounded-md px-4 py-2 w-full mb-3"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="text-xl font-bold">Gender</label>
          <select
            className="bg-gray-800 text-white rounded-md px-4 py-2 w-full mb-3"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label className="text-xl font-bold">Weight (Kg)</label>
          <input
            type="number"
            className="bg-gray-800 text-white rounded-md px-4 py-2 w-full mb-3"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <label className="text-xl font-bold">Height (Meters)</label>
          <input
            type="number"
            step="0.01"
            className="bg-gray-800 text-white rounded-md px-4 py-2 w-full mb-3"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          <label className="text-xl font-bold">Activity Level</label>
          <select
            className="bg-gray-800 text-white rounded-md px-4 py-2 w-full"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
          >
            <option value="1.2">Sedentary</option>
            <option value="1.375">Light</option>
            <option value="1.55">Moderate</option>
            <option value="1.725">Very Active</option>
            <option value="1.9">Extra Active</option>
          </select>

          {error && (
            <p className="text-red-600 font-semibold mt-4 text-center">
              {error}
            </p>
          )}

          <button
            className="bg-blue-600 text-white mt-6 w-full text-xl py-2 rounded-md"
            onClick={bmiCalculator}
          >
            Calculate
          </button>
        </div>

        <div className="mt-8 text-xl bg-gray-800 rounded-md px-8 py-6 text-center">
          <p>
            BMI Value: <b>{bmivalue || "Pending"}</b>
          </p>
          <p>
            BMI Category: <b>{message || "Pending"}</b>
          </p>
          <p>
            Recommended Calories:{" "}
            <b>
              {calories ? `${calories} kcal/day` : "Pending"}
            </b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
