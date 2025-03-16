import { useEffect, useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faBookOpen, faSearch } from '@fortawesome/free-solid-svg-icons'
import './App.css'

function App() {
  const [dataSurah, setDataSurah] = useState([])
  const [selectedSurah, setSelectedSurah] = useState(null)
  const [ayat, setAyat] = useState([])
  const [audioInstance, setAudioInstance] = useState(null)
  const [playing, setPlaying] = useState(null)
  const [pause, setPause] = useState(false)
  const [deskripsi, setDeskripsi] = useState([])
  const [selectedQari, setSelectedQari] = useState("01")
  const ayatRefs = useRef({})
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://equran.id/api/v2/surat');
      const data = await response.json();
      setDataSurah(data.data);
    };
    fetchData();
  }, []);
  

  const fetchAyat = (nomor) => {
    fetch(`https://equran.id/api/v2/surat/${nomor}`)
      .then(res => res.json())
      .then(data => {
        setAyat(data.data.ayat);
      })
      .catch(error => console.error('Ayat Error:', error));
  };
  
  const filteredSurah = dataSurah.filter(surah => 
    surah.namaLatin.toLowerCase().includes(search.toLowerCase())
  )

  const scrollToAyat = (nomorAyat) => {
    if (ayatRefs.current[nomorAyat]) {
      ayatRefs.current[nomorAyat].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  useEffect(() => {
    if (selectedSurah === "114") { // Surah An-Nas
      scrollToAyat(ayat.length);
    }
  }, [ayat]);

  useEffect(() => {
    if (selectedSurah && ayat.length > 0) {
      scrollToAyat(window.location.hash.replace('#', ''));
    }
  }, [ayat]);
  
  const playAudio = (audioUrl, nomorAyat) => {
    if (!audioUrl) return;
    
    if (audioInstance) {
      audioInstance.pause();
      audioInstance.currentTime = 0;
    }
    
    const newAudio = new Audio(audioUrl);
    newAudio.preload = "auto";
    newAudio.load();
    setAudioInstance(newAudio);
    newAudio.play();
    
    newAudio.onloadeddata = () => {
      newAudio.play();
    };
    
    newAudio.play()
    .then(() => {
      newAudio.onended = () => setPlaying(null);
      scrollToAyat(nomorAyat);
    })
    .catch((error) => console.error("Gagal memutar audio:", error));
  };
  
  const pauseAudio = () => {
    if (audioInstance) {
      audioInstance.pause();
      setPause(true);
    }
  };
  
  useEffect(() => {
    localStorage.clear();
    sessionStorage.clear();
  }, []);

  const getQariName = (key) => {
    const qariList = {
      "01": "Abdullah Al-Juhany",
      "02": "Abdul Muhsin Al-Qasim",
      "03": "Abdurrahman As-Sudais",
      "04": "Ibrahim Al-Dossari",
      "05": "Misyari Rasyid Al-Afasi"
    };
    return qariList[key] || "Qari Tidak Dikenal";
  };

  const convertToArabicNumber = (number) => {
    const arabicNumber = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    return number.toString().split('').map((digit) => arabicNumber[digit]).join('')
  }
  
  return (
    //layout utama
    <div className="bg-[url('/bg3.jpeg')] bg-cover bg-center bg-no-repeat min-h-screen w-full flex pt-26">
      <header className="fixed top-0 left-0 w-full shadow-md z-50 p-8 border-b-5 border-purple-900">
        <div className="mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold text-purple-800">E-Qur'an</h1>
          <h2 className="text-4xl text-purple-600 font-semibold">
            {selectedSurah ? `Surah: ${dataSurah.find(surah => surah.nomor === selectedSurah)?.namaLatin}` : "Select Surah"}
          </h2>
          <nav className="flex gap-5">
          </nav>
        </div>
      </header>
      {/* Sidebar/kiri ujung */}
      <div className="w-1/4 h-screen overflow-auto scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-purple-300 p-5 bg-opacity-50 flex flex-col">
        {/* Tombol pencarian  */}
        <div className="mb-4 flex items-center border p-2 rounded-lg bg-transparent">
          <FontAwesomeIcon icon={faSearch} className="mr-2 text-purple-900" />
            <input 
              type="text" 
              placeholder="Search Surah..." 
              className="w-full p-2 border-none outline-none" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)}/>
          </div>
            {filteredSurah.map((surah) => (
              <div key={surah.nomor} className="bg-transparent hover:bg-purple-500 border p-2 m-2 cursor-pointer rounded-lg"
                onClick={() => {
                  setSelectedSurah(surah.nomor);
                  fetchAyat(surah.nomor);
                  }}>
                    <div className="flex items-center gap-3">
                      <h1 className="text-3xl"><span className="before:content-['\06DD']">{convertToArabicNumber(surah.nomor)}</span></h1>                  
                      <div>
                      <p className="font-lora text-lg text-left" id='latin'>{surah.namaLatin}</p>
                      <h2 className="text-lg text-black-600">{surah.arti} | {surah.jumlahAyat} Ayat</h2>
                      </div>
                </div>
              </div>
                ))}
                {/* data surah */}
            {dataSurah.map((surah) => (
              <div key={surah.nomor} className="bg-transparent hover:bg-purple-500 border p-2 m-2 cursor-pointer rounded-lg"
                onClick={() => {
                  setSelectedSurah(surah.nomor)
                  fetchAyat(surah.nomor)
            }}>
                <p className="text-lg text-left"><span className="before:content-['\06DD']">{convertToArabicNumber(surah.nomor)}</span>{surah.namaLatin}</p>
                <h2 className="text-lg text-black-600" id='artiTeks'>{surah.arti} | {surah.jumlahAyat} ayat {surah.tempatTurun}</h2>
              <button onClick={() => playAudio(surah.audio['05'])}></button>
              </div>
            ))}
      </div>
      {/* Dalam Bar/kanan ujung */}
      <div className="w-3/4 pt-15 h-screen overflow-auto p-4">
        <div className="col-span-3 bg-transparent backdrop-blur-md border p-3 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-bold font-amiri">About information surah</h2>
          <div className="p-4 bg-transparent border rounded-lg shadow">
            <h2 className="text-xl font-bold bg-bl">{dataSurah.find(surah => surah.nomor === selectedSurah)?.namaLatin}</h2>
            <p dangerouslySetInnerHTML={{ __html: dataSurah.find(surah => surah.nomor === selectedSurah)?.deskripsi }} className="text-black-800"></p>
          </div>
          {/* Dropdown Pilih Qari */}
          <label className="block mt-2 text-xl font-semibold ">Select Qari:</label>
          <select className="p-2 border rounded mt-1" value={selectedQari} onChange={(e) => setSelectedQari(e.target.value)}>
            {Object.entries(dataSurah.find(surah => surah.nomor === selectedSurah)?.audioFull || {}).map(([key,]) => (
              <option key={key} value={key}>{getQariName(key)}</option>
            ))}
          </select>
        </div>
        {selectedSurah ? (
          <div>
            {
              ayat.map((surah) => (
                <div key={surah.nomorAyat} ref={(el) => { ayatRefs.current[surah.nomorAyat] = el }}
                  id={surah.nomorAyat}
                  className="bg-transparent p-2 m-2 rounded-lg">
                  <div className="flex items-center justify-between p-2 rounded-lg">
                  </div>
                  <div className="flex-row" id='Ayt'>
                    <h1 className='text-left text-bt' id='nomorayat'><span className="before:content-['\06DD']">
                      {convertToArabicNumber(surah.nomorAyat)}</span>
                    </h1>
                    <p className="text-right text-3xl leading-loose" id="arabteks">
                      {surah.teksArab}<span className="ml-2 text-2xl inline-block">
                        {'﴿' + convertToArabicNumber(surah.nomorAyat) + '﴾'}</span>
                    </p>
                  </div>
                  <p className='text-left text-base' id='latinteks'>{surah.teksLatin}</p>
                  <p className='text-left font-lato text-base' id='latinteks1'>{surah.teksIndonesia}</p>
                  <div className="p-2 bg-transparent rounded-lg">
                    {/* Tombol Play Audio */}
                    <button onClick={() => playAudio(dataSurah.find(surah => surah.nomor === selectedSurah)?.audioFull[selectedQari])}
                      className="mt-2 p-2 text-2xl text-pink-400 rounded">
                      <FontAwesomeIcon icon={faPlay} cursor={"pointer"} />
                    </button>
                    <button onClick={() => pauseAudio(dataSurah.find(surah => surah.nomor === selectedSurah)?.audioFull[selectedQari])}
                      className="mt-2 p-2 text-2xl text-pink-400 rounded">
                      <FontAwesomeIcon icon={faPause} cursor={"pointer"} />
                    </button>
                  </div>
                </div>
              ))  
            }
          </div>
        ) : (
          <div className="text-center">
          <h1 className="text-3xl mt-15 m-5 p-10 animate__animated animate__fadeInDown">
            Read and listen to the Quran anytime, anywhere.
            </h1>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default App
