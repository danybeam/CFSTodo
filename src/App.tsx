import "./App.css";
import CurrentTask from "./components/CurrentTask";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import SettingsContext from "./components/context/AppSettings"

function App() {

  return (
    <>
      <div class="time-slice" classList={{ overburdened: SettingsContext.isOverburdened() }}>
        {(SettingsContext.isOverburdened() ? "Overburdened! (forcing 4hrs per slice)" : SettingsContext.calculatedTimeSlice().toFixed(2) + " hours per slice")}
      </div>
      <div class="container">
        <CurrentTask />
        <div class="medium padded" />
        <TaskForm />
        <div class="medium padded" />
        <TaskList />
      </div>
    </>
  );
}

export default App;
