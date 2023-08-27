import React, { useState, useEffect } from "react";
import axios from "axios";
import "./St.css";
import { animateScroll as scroll } from "react-scroll";

function Feching() {
  const [post, sets] = useState([]);
  const [surah, setSurah] = useState([0]);
  const [surahId, setId] = useState("1");
  const [audioId, setAudio] = useState("");
  useEffect(() => {
    axios
      .get("https://api.alquran.cloud/v1/quran/quran-uthmani")
      .then((res) => {
        // console.log(res.data.data.surahs);
        setSurah(res.data.data.surahs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://api.alquran.cloud/v1/surah/${surahId}/ar.alafasy`)
      .then((res) => {
        // console.log(res)
        sets(res.data.data.ayahs);
      })
      .catch((error) => {
        console.log(error);
      }, []);
  });

  return (
    <div>
      <div className="big">
        {surah.map((post) => (
          <div onClick={() => setId(post.number) & scroll.scrollToTop()}>
            {post.name}
          </div>
        ))}{" "}
      </div>
      <div className="shape">
        <div className="aya">
          <h1>{surah[surahId - 1].name}</h1>
          {post.map((e) => (
            <div className="p">
              <p className="p" onClick={() => setAudio(e.number)}>
                {e.text}
              </p>
              <h2>{e.numberInSurah}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="audioD">
        {" "}
        <audio
          controls
          autoPlay
          src={`https://cdn.islamic.network/quran/audio/128/ar.alafasy/${audioId}.mp3`}
        />
      </div>

      {/* {audio()}
      // <div className="kackg">
      //   {" "}
      //   {post.map((e) => (
      //     <div>
      //       {" "}
      //       <p>
      //         الاستماع للآية<h3>{e.numberInSurah}</h3>
      //       </p>
      //       <audio key={e.number} controls src={e.audio} />{" "}
      //     </div>
      //   ))} */}
      // {/* </div> */}
    </div>
  );
}

export default Feching;
