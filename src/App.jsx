import { useState } from "react";
import "./App.css";

const getFormattedDate = (date) => {
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return dd + "/" + mm + "/" + yyyy;
};

const getFormattedTime = (date) => {
  let hh = date.getHours();
  let mm = date.getMinutes();

  if (hh < 10) hh = "0" + hh;
  if (mm < 10) mm = "0" + mm;

  return hh + ":" + mm;
};

const newEntryObject = () => {
  return {
    date: new Date(),
    text: "",
  };
};

function App() {
  const [entries, setEntries] = useState([]);
  const [selectedEntryIndex, setSelectedEntryIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const selectedEntry = entries[selectedEntryIndex];

  return (
    <div className="outer-wrapper">
      <div className="header">
        <h2>Journal</h2>
      </div>
      <div className="main-panel">
        <div className="left-panel">
          <button className="panel-tip"
            onClick={() => setEntries([...entries, newEntryObject()])}
          >
            {entries.length === 0 ? "You have no entries! Click me to get started." : "Add new entry"}
          </button>

          <div className="panel-entries">
            {entries.map((entry, index) => {
              let panelText = selectedEntryIndex === index ? currentText : entry.text;
              if (panelText.length === 0) {
                panelText = 'No text';
              }

              return (
                <div
                  className={`panel-entry ${selectedEntryIndex === index ? "selected" : ""
                    }`}
                  onClick={() => {
                    if (index === selectedEntryIndex) {
                      return;
                    }

                    const newEntries = entries.map((e, index) => {
                      const { date, text } = entries[index];
                      return { date, text };
                    });
                    newEntries[selectedEntryIndex].text = currentText;

                    setEntries(newEntries);
                    setSelectedEntryIndex(index);
                    setCurrentText(entries[index].text);
                  }}
                >
                  <p className="entry-date">{getFormattedDate(entry.date)}</p>
                  <p className="entry-date">{getFormattedTime(entry.date)}</p>

                  <p className={`panel-text ${entry.text.length === 0 ? 'empty' : ''}`}>{panelText}</p>
                </div>
              );
            })}
          </div>
        </div>
        {selectedEntry && (
          <div className="right-panel">
            <textarea
              placeholder={
                selectedEntry.text.length > 0 ? `Enter some text here...` : ""
              }
              value={currentText}
              onChange={(event) => {
                const text = event.target.value;
                setCurrentText(text);
              }}
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
