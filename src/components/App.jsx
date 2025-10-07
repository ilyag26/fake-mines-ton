import { use, useEffect, useState } from 'react';
import reactLogo from './../assets/react.svg';
import viteLogo from '/vite.svg';
import './../styles/App.css';
import gifEmerald from './../assets/emerald.gif'
import gifExplode from './../assets/bomb-explode.gif'
import gifBomb from './../assets/bomb.gif'
import pngBomb from './../assets/bomb.gif'

function App() {
  const [traps, setTraps] = useState(6);
  const [balance, setBalance] = useState(10.0000000);
  const [textButton, setTextButton] = useState("Bet")
  const [buttonActive, setButtonActive] = useState(0);
  const [cellDisplay, setCellDisplay] = useState({});
  const [winWindow, setWinWindow] = useState(false)
  const [countActiveCells, setCountActiveCells] = useState(0)
  const [cellStatus, setCellStatus] = useState({
    1 : false, 
    2 : false, 
    3 : false, 
    4 : false, 
    5 : false, 
    6 : false, 
    7 : false, 
    8 : false, 
    9 : false, 
    10 : false, 
    11 : false, 
    12 : false, 
    13 : false, 
    14 : false, 
    15 : false, 
    16 : false, 
    17 : false, 
    18 : false, 
    19 : false, 
    20 : false, 
    21 : false,
    22 : false,
    23 : false,
    24 : false,
    25 : false,
  });

  useEffect(() =>{
    if (countActiveCells == 26-traps){
      finishAll();
    }
    setCountActiveCells(prev => prev + 1);
  }, [cellStatus]);

  const createEmptyCells = (count = 25) => {
    const obj = {};
    for (let i = 1; i <= count; i++) {
      obj[i] = false;
    }
    return obj;
  };

  const clickCell = (id) =>{
    if (buttonActive){
    setCellStatus(prev => ({
      ...prev,
      [id]: true
    }));
    setTextButton("💣");
    setTimeout(() =>{
        setTextButton("Chashout");
      }, 200)
    }
  }

  const generateBombsAndEmeralds = (cellStatus, traps) => {
  // 1. Копируем исходные данные
  const updatedDisplay = {};

  // 2. Берём все id, где false (ещё не открытые клетки)
  const availableKeys = Object.keys(cellStatus).filter(key => !cellStatus[key]);

  // 3. Перемешиваем их (простой способ)
  const bombKeys = availableKeys
    .sort(() => Math.random() - 0.5)
    .slice(0, traps); // первые N — бомбы

  // 4. Для каждой доступной клетки
  availableKeys.forEach(key => {
    // setCellDisplay(prev => ({
    //   ...prev,
    //   [key]: "close"
    // }));

    setTimeout(() => {
      setCellDisplay(prev => ({
        ...prev,
        [key]: bombKeys.includes(key) ? "bomb" : "emerald"
      }));
    }, 100);
  });
  }

  const finishAll = () =>{
    setWinWindow(true);
    setButtonActive(2);
    generateBombsAndEmeralds(cellStatus, traps);
    setCountActiveCells(0);
    setTimeout(() =>{
        setTextButton("Bet");
      }, 210)
  }

  const btnActive = () => {

    if (buttonActive == 0){
      setCellDisplay({})
      setButtonActive(1);
      setTextButton("💣");
          setTimeout(() =>{
          setTextButton("Chashout");
      }, 200)
    }

    if (buttonActive == 1){
      finishAll();
    }

    if (buttonActive == 2){
      setButtonActive(0);
      setTextButton("Bet");
      setCellStatus(createEmptyCells());
      setCellDisplay({});
      setWinWindow(false)
    }

  }

  return (
<>
    <div id="preloader" style={{ display: "none" }}>
      <p></p><div className="logo"></div><p></p>
    </div>
<div className="application dark">
  <div className="site-container">
  <section id="header">
    <div className="wrapper justify-content-between">
      <div className="logo"></div>
      <div className="dropdown dropdown-wallets">
        <button className="btn btn-secondary dropdown-toggle wallets-btn" id="dropdownWallets" data-bs-toggle="dropdown" aria-expanded="false" type="button">
          <div className="container-balance">
            <span>{balance.toFixed(7)} <i className="crypto-logo" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Crect width=\"20\" height=\"20\" rx=\"10\" fill=\"%2350AF95\"/%3E%3Cpath fillRule=\"evenodd\" clipRule=\"evenodd\" d=\"M11.4878 10.3747C11.4171 10.3802 11.0518 10.4028 10.2369 10.4028C9.58878 10.4028 9.1286 10.3826 8.96715 10.3747C6.46236 10.2607 4.59276 9.8096 4.59276 9.26948C4.59276 8.72937 6.46236 8.27886 8.96715 8.16304V9.92542C9.13096 9.93762 9.59998 9.96627 10.2481 9.96627C11.0259 9.96627 11.4154 9.93274 11.4855 9.92603V8.16426C13.985 8.27947 15.8505 8.73059 15.8505 9.26948C15.8505 9.80838 13.9856 10.2595 11.4855 10.3741L11.4878 10.3747ZM11.4878 7.98198V6.40492H14.976V4H5.47895V6.40492H8.96656V7.98137C6.13181 8.1161 4 8.69706 4 9.39323C4 10.0894 6.13181 10.6698 8.96656 10.8051V15.8588H11.4873V10.8033C14.3155 10.6685 16.4438 10.0882 16.4438 9.39262C16.4438 8.69706 14.3173 8.11671 11.4873 7.98137L11.4878 7.98198Z\" fill=\"white\"/%3E%3C/svg%3E')"}}></i></span>
          </div>
        </button>
        <a className="openCurrency" data-ember-action="" data-ember-action-6="6"></a>
        <ul className="dropdown-menu fade-in" aria-labelledby="dropdownWallets" style={{}}>
          <li data-ember-action="" data-ember-action-49="49"><a className="dropdown-item">0.0000000 <i className="crypto-logo"   style={{
          width: "64px",
          height: "64px",
          backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"%3E%3Cg fill=\"none\"%3E%3Ccircle fill=\"%2366F9A1\" cx=\"16\" cy=\"16\" r=\"16\"/%3E%3Cpath d=\"M9.925 19.687a.59.59 0 01.415-.17h14.366a.29.29 0 01.207.497l-2.838 2.815a.59.59 0 01-.415.171H7.294a.291.291 0 01-.207-.498l2.838-2.815zm0-10.517A.59.59 0 0110.34 9h14.366c.261 0 .392.314.207.498l-2.838 2.815a.59.59 0 01-.415.17H7.294a.291.291 0 01-.207-.497L9.925 9.17zm12.15 5.225a.59.59 0 00-.415-.17H7.294a.291.291 0 00-.207.498l2.838 2.815c.11.109.26.17.415.17h14.366a.291.291 0 00.207-.498l-2.838-2.815z\" fill=\"%23FFF\"/%3E%3C/g%3E%3C/svg%3E')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
      }}></i></a></li>
          <li data-ember-action="" data-ember-action-50="50"><a className="dropdown-item">0.0000000 <i className="crypto-logo" style={{
          width: "64px",
          height: "64px",
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\"%3E%3Cg fill=\"none\" fillRule=\"evenodd\"%3E%3Ccircle cx=\"16\" cy=\"16\" r=\"16\" fill=\"%23627EEA\"/%3E%3Cg fill=\"%23FFF\" fillRule=\"nonzero\"%3E%3Cpath fill-opacity=\".602\" d=\"M16.498 4v8.87l7.497 3.35z\"/%3E%3Cpath d=\"M16.498 4L9 16.22l7.498-3.35z\"/%3E%3Cpath fill-opacity=\".602\" d=\"M16.498 21.968v6.027L24 17.616z\"/%3E%3Cpath d=\"M16.498 27.995v-6.028L9 17.616z\"/%3E%3Cpath fill-opacity=\".2\" d=\"M16.498 20.573l7.497-4.353-7.497-3.348z\"/%3E%3Cpath fill-opacity=\".602\" d=\"M9 16.22l7.498 4.353v-7.701z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}></i></a></li>
          <li data-ember-action="" data-ember-action-51="51"><a className="dropdown-item">0.0000000 <i className="crypto-logo" style={{
          width: "40px",
          height: "40px",
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg clipPath=\"url(%23clip0_1_8648)\"%3E%3Cpath d=\"M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z\" fill=\"%230088CC\"/%3E%3Cpath fillRule=\"evenodd\" clipRule=\"evenodd\" d=\"M7.21429 6.60718H12.8214C13.0357 6.60718 13.2143 6.64289 13.4286 6.75003C13.6786 6.85718 13.8214 7.03575 13.8929 7.17861C13.8929 7.17861 13.8929 7.21432 13.9286 7.21432C14.0357 7.39289 14.1071 7.60718 14.1071 7.85718C14.1071 8.07146 14.0714 8.28575 13.9286 8.50003L10.3929 14.5715C10.3214 14.7143 10.1786 14.7857 10 14.7857C9.85714 14.7857 9.71429 14.7143 9.60714 14.5715L6.14286 8.50003C6.07143 8.35718 5.92857 8.17861 5.92857 7.89289C5.89286 7.64289 5.96429 7.42861 6.07143 7.21432C6.17857 7.00004 6.35714 6.82146 6.60714 6.75003C6.82143 6.60718 7.07143 6.60718 7.21429 6.60718ZM9.57143 7.46432H7.21429C7.07143 7.46432 7 7.46432 6.96429 7.50003C6.89286 7.53575 6.85714 7.57146 6.82143 7.64289C6.78571 7.67861 6.78571 7.75003 6.78571 7.82146C6.78571 7.85718 6.82143 7.89289 6.89286 8.03575L9.57143 12.6786V7.46432ZM10.4286 7.46432V12.7143L13.1429 8.03575C13.1786 7.96432 13.1786 7.89289 13.1786 7.82146C13.1786 7.75003 13.1786 7.67861 13.1429 7.64289C13.1071 7.60718 13.1071 7.57146 13.0714 7.57146L13.0357 7.53575C12.9643 7.50003 12.8929 7.50003 12.7857 7.50003H10.4286V7.46432Z\" fill=\"%23F6F6F6\"/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id=\"clip0_1_8648\"%3E%3Crect width=\"20\" height=\"20\" fill=\"white\"/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}></i></a></li>
          <li data-ember-action="" data-ember-action-52="52"><a className="dropdown-item">0.0000000 <i className="crypto-logo" style={{
          width: "40px",
          height: "40px",
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Crect width=\"20\" height=\"20\" rx=\"10\" fill=\"%23FF060A\"/%3E%3Cpath d=\"M15.8368 7.61509C15.2449 7.09572 14.4262 6.30261 13.7594 5.74012L13.72 5.71387C13.6543 5.66376 13.5803 5.62447 13.501 5.59762C11.8932 5.31262 4.41034 3.98326 4.26435 4.00014C4.22345 4.00558 4.18435 4.01968 4.14993 4.04139L4.11245 4.06951C4.06629 4.11406 4.03124 4.16788 4.00986 4.22701L4 4.25138V4.38451V4.40513C4.84238 6.63448 8.16852 13.9375 8.82349 15.6512C8.86295 15.7675 8.93791 15.9887 9.07798 16H9.10955C9.18451 16 9.50411 15.5987 9.50411 15.5987C9.50411 15.5987 15.2173 9.01382 15.7954 8.31258C15.8702 8.2262 15.9362 8.13329 15.9926 8.03509C16.007 7.95825 16.0002 7.87918 15.9729 7.80557C15.9456 7.73197 15.8987 7.66634 15.8368 7.61509ZM10.9699 8.38196L13.4083 6.46011L14.8385 7.71259L10.9699 8.38196ZM10.023 8.25633L5.82484 4.98638L12.6172 6.17698L10.023 8.25633ZM10.4017 9.1132L14.6985 8.45508L9.78622 14.08L10.4017 9.1132ZM5.2547 5.31262L9.67179 8.87507L9.03261 14.0838L5.2547 5.31262Z\" fill=\"white\"/%3E%3C/svg%3E')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}></i></a></li>
          <li data-ember-action="" data-ember-action-53="53"><a className="dropdown-item">0.0000000 <i className="crypto-logo" style={{
          width: "40px",
          height: "40px",
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Crect width=\"20\" height=\"20\" rx=\"10\" fill=\"%2350AF95\"/%3E%3Cpath fillRule=\"evenodd\" clipRule=\"evenodd\" d=\"M11.4878 10.3747C11.4171 10.3802 11.0518 10.4028 10.2369 10.4028C9.58878 10.4028 9.1286 10.3826 8.96715 10.3747C6.46236 10.2607 4.59276 9.8096 4.59276 9.26948C4.59276 8.72937 6.46236 8.27886 8.96715 8.16304V9.92542C9.13096 9.93762 9.59998 9.96627 10.2481 9.96627C11.0259 9.96627 11.4154 9.93274 11.4855 9.92603V8.16426C13.985 8.27947 15.8505 8.73059 15.8505 9.26948C15.8505 9.80838 13.9856 10.2595 11.4855 10.3741L11.4878 10.3747ZM11.4878 7.98198V6.40492H14.976V4H5.47895V6.40492H8.96656V7.98137C6.13181 8.1161 4 8.69706 4 9.39323C4 10.0894 6.13181 10.6698 8.96656 10.8051V15.8588H11.4873V10.8033C14.3155 10.6685 16.4438 10.0882 16.4438 9.39262C16.4438 8.69706 14.3173 8.11671 11.4873 7.98137L11.4878 7.98198Z\" fill=\"white\"/%3E%3C/svg%3E')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}></i></a></li>
          <li data-ember-action="" data-ember-action-54="54"><a className="dropdown-item">0.0000000 <i className="crypto-logo" style={{
        width: "40px",
        height: "40px",
        backgroundImage:
          "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg clipPath=\"url(%23clip0_1_9581)\"%3E%3Cpath d=\"M19.7006 12.4193C18.3649 17.7765 12.9383 21.0367 7.57986 19.7008C2.22368 18.3653 -1.03697 12.9389 0.299336 7.58219C1.63447 2.22441 7.06105 -1.03612 12.4178 0.29945C17.7759 1.63502 21.0363 7.06192 19.7005 12.4194L19.7006 12.4193H19.7006Z\" fill=\"%23F7931A\"/%3E%3Cpath d=\"M14.41 8.57525C14.6091 7.24447 13.5958 6.52912 12.2102 6.05191L12.6597 4.24925L11.5623 3.97582L11.1247 5.73102C10.8362 5.65907 10.5399 5.59128 10.2454 5.52407L10.6862 3.75729L9.58938 3.48386L9.13965 5.28593C8.90089 5.23158 8.66639 5.17786 8.43889 5.12126L8.44016 5.11559L6.92674 4.7377L6.6348 5.90973C6.6348 5.90973 7.44902 6.09635 7.43186 6.10783C7.87627 6.21874 7.95664 6.51289 7.94329 6.74605L7.43128 8.7997C7.46188 8.80747 7.50157 8.81872 7.54537 8.83631C7.50876 8.82722 7.4698 8.8173 7.42937 8.80762L6.7117 11.6845C6.65738 11.8195 6.51953 12.0221 6.20882 11.9452C6.21982 11.9611 5.41117 11.7461 5.41117 11.7461L4.8663 13.0022L6.29447 13.3582C6.56015 13.4248 6.82051 13.4945 7.07691 13.5601L6.62277 15.3834L7.71896 15.6568L8.1687 13.8529C8.46817 13.9342 8.75879 14.0091 9.04329 14.0798L8.59507 15.8753L9.69258 16.1487L10.1467 14.3288C12.0181 14.6829 13.4252 14.5402 14.0175 12.8477C14.4948 11.485 13.9937 10.699 13.0092 10.1865C13.7263 10.0211 14.2664 9.54955 14.4104 8.57539L14.4101 8.57515L14.41 8.57525ZM11.9026 12.0909C11.5634 13.4536 9.2689 12.717 8.52497 12.5323L9.12762 10.1166C9.8715 10.3023 12.2571 10.6698 11.9027 12.0909H11.9026ZM12.242 8.5555C11.9326 9.79498 10.0228 9.16527 9.40333 9.01086L9.94971 6.82005C10.5692 6.97446 12.5643 7.26265 12.2421 8.5555H12.242Z\" fill=\"white\"/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id=\"clip0_1_9581\"%3E%3Crect width=\"20\" height=\"20\" fill=\"white\"/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "contain",
      }}></i></a></li>
        </ul>
      </div>
      <div id="user" className="d-flex pointer align-items-center">
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle dropdown-svg-icon" id="dropdownCurrency" data-bs-auto-close="outside" data-bs-toggle="dropdown" aria-expanded="false" type="button">
          <div className="avatar"></div>
          </button>
          <div className="dropdown-menu menu-option-currency fade-in" aria-labelledby="dropdownCurrency">
            <div className="blur"></div>
            <div className="row mb-3" data-ember-action="" data-ember-action-7="7">
              <div className="col col-auto">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.66643 4.6657C7.33722 4.6657 9.33286 3.6099 9.33286 2.66584C9.33286 1.72187 7.33717 0.666016 4.66643 0.666016C1.99569 0.666016 4.44494e-05 1.72187 4.44494e-05 2.66584C4.44494e-05 3.6099 1.99564 4.6657 4.66643 4.6657ZM4.66643 12.6654C5.05625 12.6654 5.43145 12.6428 5.78833 12.6015C5.48519 12.2121 5.2375 11.7825 5.05234 11.3251C4.92428 11.3294 4.79578 11.3324 4.66639 11.3324C3.1403 11.3324 1.69508 11.03 0.597044 10.4809C0.380842 10.3728 0.181887 10.2567 4.44494e-05 10.1337V10.6656C4.44494e-05 11.6096 1.99564 12.6654 4.66643 12.6654ZM4.66643 9.99887C4.68012 9.99887 4.69359 9.99865 4.70723 9.99861C4.67954 9.7774 4.66564 9.55467 4.66563 9.33173C4.66563 9.10602 4.67985 8.88359 4.70723 8.66526C4.69359 8.66526 4.68008 8.66575 4.66643 8.66575C3.14035 8.66575 1.69517 8.36336 0.597089 7.81432C0.380842 7.70622 0.181842 7.59007 0 7.46717V7.99901C4.44494e-05 8.94302 1.99564 9.99887 4.66643 9.99887ZM4.66643 7.33222C4.79871 7.33222 4.92921 7.32956 5.05807 7.32449C5.26369 6.82045 5.54515 6.35081 5.8927 5.93185C5.48548 5.97669 5.07611 5.99917 4.66643 5.99919C3.14035 5.99919 1.69517 5.6968 0.597089 5.14776C0.380842 5.03961 0.181842 4.92351 0 4.80056V5.33245C4.44494e-05 6.27646 1.99564 7.33222 4.66643 7.33222ZM6.66665 7.12184C6.37302 7.56274 6.1704 8.05784 6.07068 8.57809C6.02306 8.82648 5.99911 9.07882 5.99916 9.33173C5.99916 9.5254 6.01329 9.71582 6.04001 9.9022C6.10436 10.3513 6.24523 10.786 6.4565 11.1874C6.67346 11.5997 6.96036 11.9712 7.30441 12.2854C8.01596 12.9352 8.96229 13.3322 9.9996 13.3322C12.2054 13.3322 14 11.5376 14 9.33173C14 7.12584 12.2054 5.33129 9.9996 5.33129C9.77162 5.33129 9.54808 5.35076 9.33037 5.38756C8.22145 5.57509 7.26632 6.22046 6.66665 7.12184Z" fill="white"></path>
                </svg>
              </div>
              <div className="col right-align">
                USD ($)
              </div>
            </div>
            <div className="row mb-3" data-ember-action="" data-ember-action-8="8">
              <div className="col col-auto">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.82023 6.99999C3.82023 6.25337 3.86071 5.52252 3.93862 4.8248H0.345248C0.119627 5.51795 0.00219727 6.24992 0.00219727 6.99999C0.00219727 7.57358 0.0709988 8.13654 0.204119 8.67971H3.88996C3.8439 8.13424 3.82023 7.57172 3.82023 6.99999ZM3.97795 9.49975H0.459863C0.806467 10.4082 1.34384 11.2416 2.05184 11.9498C2.98573 12.884 4.13729 13.5212 5.39195 13.8149C5.11948 13.437 4.87204 12.9575 4.65741 12.3832C4.34746 11.554 4.11766 10.5705 3.97795 9.49975ZM9.94974 4.00476H13.3286C12.9891 3.28812 12.5252 2.62761 11.948 2.05021C11.0141 1.11599 9.86252 0.47885 8.60788 0.185111C8.88035 0.563013 9.12779 1.04249 9.34242 1.61677C9.6039 2.31634 9.80828 3.12584 9.94974 4.00476ZM4.05006 4.00476C4.19152 3.12584 4.3959 2.31634 4.65741 1.61677C4.87204 1.04252 5.11945 0.563013 5.39195 0.185111C4.13729 0.47885 2.98576 1.11599 2.05186 2.05021C1.47464 2.62761 1.01074 3.28812 0.671187 4.00476H4.05006ZM10.0218 9.49975C9.88214 10.5705 9.65234 11.554 9.34239 12.3832C9.12776 12.9575 8.88033 13.437 8.60785 13.8149C9.86252 13.5212 11.014 12.884 11.9479 11.9498C12.6559 11.2416 13.1933 10.4082 13.5399 9.49975H10.0218ZM13.6546 4.8248H10.0612C10.1391 5.52254 10.1795 6.25339 10.1795 6.99999C10.1795 7.57169 10.1559 8.13424 10.1098 8.67971H13.7957C13.9288 8.13654 13.9976 7.57358 13.9976 6.99999C13.9976 6.24992 13.8802 5.51795 13.6546 4.8248ZM9.19506 9.49975H4.80474C4.93705 10.466 5.1467 11.3501 5.42554 12.0961C5.87113 13.2883 6.45967 14 6.99991 14C7.54016 14 8.1287 13.2882 8.57429 12.0961C8.8531 11.3501 9.06276 10.466 9.19506 9.49975ZM4.88063 4.00476H9.1192C8.98783 3.23127 8.80469 2.52034 8.57429 1.90386C8.12867 0.711742 7.54013 0 6.99989 0C6.45964 0 5.87113 0.711742 5.42552 1.90386C5.19511 2.52034 5.01197 3.23127 4.88063 4.00476ZM9.2362 4.8248H4.76358C4.6825 5.51858 4.64027 6.25003 4.64027 6.99999C4.64027 7.57358 4.66506 8.13629 4.7129 8.67971H9.28687C9.33471 8.13629 9.3595 7.57361 9.3595 6.99999C9.35953 6.25003 9.3173 5.51858 9.2362 4.8248Z" fill="white"></path>
                </svg>
              </div>
              <div className="col right-align flex">
                ENG
              </div>
            </div>
            <div className="row" data-ember-action="" data-ember-action-9="9">
              <div className="col col-auto">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.6875 3.0625H1.3125C1.07187 3.0625 0.875 3.25937 0.875 3.5V5.635C0.875 5.87563 1.07187 6.0725 1.3125 6.0725H1.31687C1.82437 6.0725 2.24 6.48812 2.24 6.99563C2.24 7.385 2.00375 7.72625 1.63188 7.86187C1.53125 7.90125 1.42188 7.92313 1.3125 7.92313C1.07187 7.92313 0.875 8.12 0.875 8.36063V10.5C0.875 10.7406 1.07187 10.9375 1.3125 10.9375H12.6875C12.9281 10.9375 13.125 10.7406 13.125 10.5V8.36063C13.125 8.12 12.9281 7.92313 12.6875 7.92313C12.5781 7.92313 12.4688 7.90125 12.3594 7.8575C11.9963 7.72625 11.76 7.385 11.76 6.99563C11.76 6.48812 12.1756 6.0725 12.6875 6.0725C12.9281 6.0725 13.125 5.87563 13.125 5.635V3.5C13.125 3.25937 12.9281 3.0625 12.6875 3.0625ZM7 4.34875C7.74375 4.34875 8.3475 4.95688 8.3475 5.69625C8.3475 6.44 7.74375 7.04375 7 7.04375C6.25625 7.04375 5.6525 6.44 5.6525 5.69625C5.6525 4.95688 6.25625 4.34875 7 4.34875ZM8.79813 9.21375C8.79813 9.45437 8.60563 9.65125 8.36063 9.65125C8.12 9.65125 7.92313 9.45437 7.92313 9.21375V8.3825C7.92313 8.35625 7.90125 8.33437 7.875 8.33437H6.125C6.09875 8.33437 6.07688 8.35625 6.07688 8.3825V9.21375C6.07688 9.45437 5.88 9.65125 5.63938 9.65125C5.39438 9.65125 5.20188 9.45437 5.20188 9.21375V8.3825C5.20188 7.87063 5.61312 7.45937 6.125 7.45937H7.875C8.38688 7.45937 8.79813 7.87063 8.79813 8.3825V9.21375Z" fill="white"></path>
                  <rect x="5" y="4" width="5" height="6" fill="white"></rect>
                </svg>
              </div>
              <div className="col right-align flex">
                Promo code
              </div>
            </div>
          </div>
          <div className="dropdown-menu menu-option-currency-blur fade-in" aria-labelledby="dropdownCurrency"></div>
        </div>
      </div>
    </div>
  </section>
  <div className="container-sm">
    <section className="game-section">
      {winWindow && (
        <div class="winner-block">
            <div class="close-winner"></div>
              <div class="winner-container">
                  <div class="winner-title">22227x</div>
                  <div class="line-container">
                      <div class="winner-line"></div>
                  </div>
                  <div class="winner-text">11.000000<span class="crypto-logo">💎</span></div>
              </div>
          </div>
        )}
    <div className="game ">
        <div className="row-game">
          <div className="cell" onClick={() => clickCell(1)}>
            <div className={`cell-object cell0-0 ${cellStatus[1] == true ? 'active' : ''}`}>
              {/* .game.non-animate .emerald
              .effect-bomb
              <div className="bomb"></div> */}
              {cellStatus[1] && <div className="emerald"></div>}

              {!cellStatus[1] && (
                <>
                {cellDisplay[1] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[1] === "bomb" && <div className="bomb"></div>}
                </>
              )}

            </div>
          </div>
          <div className="cell" onClick={() => clickCell(2)}>
            <div className={`cell-object cell0-1 ${cellStatus[2] == true ? 'active' : ''}`}>
              
             {cellStatus[2] && <div className="emerald"></div>}

              {!cellStatus[2] && (
                <>
                {cellDisplay[2] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[2] === "bomb" && <div className="bomb"></div>}
                </>
              )}

            </div>
          </div>
          <div className="cell" onClick={() => clickCell(3)}>
            <div className={`cell-object cell0-2 ${cellStatus[3] == true ? 'active' : ''}`}>
             {cellStatus[3] && <div className="emerald"></div>}

              {!cellStatus[3] && (
                <>
                {cellDisplay[3] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[3] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(4)}>
            <div className={`cell-object cell0-3 ${cellStatus[4] == true ? 'active' : ''}`}>
             {cellStatus[4] && <div className="emerald"></div>}

              {!cellStatus[4] && (
                <>
                {cellDisplay[4] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[4] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(5)}>
            <div className={`cell-object cell0-4 ${cellStatus[5] == true ? 'active' : ''}`}>
             {cellStatus[5] && <div className="emerald"></div>}

              {!cellStatus[5] && (
                <>
                {cellDisplay[5] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[5] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="row-game">
          <div className="cell" onClick={() => clickCell(6)}>
            <div className={`cell-object cell1-0 ${cellStatus[6] == true ? 'active' : ''}`}>
             {cellStatus[6] && <div className="emerald"></div>}

              {!cellStatus[6] && (
                <>
                {cellDisplay[6] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[6] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(7)}>
            <div className={`cell-object cell1-1 ${cellStatus[7] == true ? 'active' : ''}`}>
             {cellStatus[7] && <div className="emerald"></div>}

              {!cellStatus[7] && (
                <>
                {cellDisplay[7] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[7] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(8)}>
            <div className={`cell-object cell1-2 ${cellStatus[8] == true ? 'active' : ''}`}>
             {cellStatus[8] && <div className="emerald"></div>}

              {!cellStatus[8] && (
                <>
                {cellDisplay[8] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[8] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(9)}>
            <div className={`cell-object cell1-3 ${cellStatus[9] == true ? 'active' : ''}`}>
             {cellStatus[9] && <div className="emerald"></div>}

              {!cellStatus[9] && (
                <>
                {cellDisplay[9] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[9] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(10)}>
            <div className={`cell-object cell1-4 ${cellStatus[10] == true ? 'active' : ''}`}>
             {cellStatus[10] && <div className="emerald"></div>}

              {!cellStatus[10] && (
                <>
                {cellDisplay[10] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[10] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="row-game">
          <div className="cell" onClick={() => clickCell(11)}>
            <div className={`cell-object cell2-0 ${cellStatus[11] == true ? 'active' : ''}`}>
             {cellStatus[11] && <div className="emerald"></div>}

              {!cellStatus[11] && (
                <>
                {cellDisplay[11] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[11] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(12)}>
            <div className={`cell-object cell2-1 ${cellStatus[12] == true ? 'active' : ''}`}>
             {cellStatus[12] && <div className="emerald"></div>}

              {!cellStatus[12] && (
                <>
                {cellDisplay[12] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[12] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(13)}>
            <div className={`cell-object cell2-2 ${cellStatus[13] == true ? 'active' : ''}`}>
             {cellStatus[13] && <div className="emerald"></div>}

              {!cellStatus[13] && (
                <>
                {cellDisplay[13] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[13] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(14)}>
            <div className={`cell-object cell2-3 ${cellStatus[14] == true ? 'active' : ''}`}>
             {cellStatus[14] && <div className="emerald"></div>}

              {!cellStatus[14] && (
                <>
                {cellDisplay[14] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[14] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(15)}>
            <div className={`cell-object cell2-4 ${cellStatus[15] == true ? 'active' : ''}`}>
             {cellStatus[15] && <div className="emerald"></div>}

              {!cellStatus[15] && (
                <>
                {cellDisplay[15] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[15] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="row-game">
          <div className="cell" onClick={() => clickCell(16)}>
            <div className={`cell-object cell3-0 ${cellStatus[16] == true ? 'active' : ''}`}>
             {cellStatus[16] && <div className="emerald"></div>}

              {!cellStatus[16] && (
                <>
                {cellDisplay[16] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[16] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(17)}>
            <div className={`cell-object cell3-1 ${cellStatus[17] == true ? 'active' : ''}`}>
             {cellStatus[17] && <div className="emerald"></div>}

              {!cellStatus[17] && (
                <>
                {cellDisplay[17] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[17] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(18)}>
            <div className={`cell-object cell3-2 ${cellStatus[18] == true ? 'active' : ''}`}>
             {cellStatus[18] && <div className="emerald"></div>}

              {!cellStatus[18] && (
                <>
                {cellDisplay[18] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[18] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(19)}>
            <div className={`cell-object cell3-3 ${cellStatus[19] == true ? 'active' : ''}`}>
             {cellStatus[19] && <div className="emerald"></div>}

              {!cellStatus[19] && (
                <>
                {cellDisplay[19] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[19] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(20)}>
            <div className={`cell-object cell3-4 ${cellStatus[20] == true ? 'active' : ''}`}>
             {cellStatus[20] && <div className="emerald"></div>}

              {!cellStatus[20] && (
                <>
                {cellDisplay[20] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[20] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="row-game">
          <div className="cell" onClick={() => clickCell(21)}>
            <div className={`cell-object cell4-0 ${cellStatus[21] == true ? 'active' : ''}`}>
             {cellStatus[21] && <div className="emerald"></div>}

              {!cellStatus[21] && (
                <>
                {cellDisplay[21] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[21] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(22)}>
            <div className={`cell-object cell4-1 ${cellStatus[22] == true ? 'active' : ''}`}>
             {cellStatus[22] && <div className="emerald"></div>}

              {!cellStatus[22] && (
                <>
                {cellDisplay[22] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[22] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(23)}>
            <div className={`cell-object cell4-2 ${cellStatus[23] == true ? 'active' : ''}`}>
             {cellStatus[23] && <div className="emerald"></div>}

              {!cellStatus[23] && (
                <>
                {cellDisplay[23] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[23] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(24)}>
            <div className={`cell-object cell4-3 ${cellStatus[24] == true ? 'active' : ''}`}>
             {cellStatus[24] && <div className="emerald"></div>}

              {!cellStatus[24] && (
                <>
                {cellDisplay[24] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[24] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
          <div className="cell" onClick={() => clickCell(25)}>
            <div className={`cell-object cell4-4 ${cellStatus[25] == true ? 'active' : ''}`}>
             {cellStatus[25] && <div className="emerald"></div>}

              {!cellStatus[25] && (
                <>
                {cellDisplay[25] === "emerald" && <div className="emerald"></div>}
                {cellDisplay[25] === "bomb" && <div className="bomb"></div>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="white none-padding">
      <div className="row">
        <div className="mb-3 bet-container special-btn-bet-container">
          {/* <div className="mb-3 bet-container special-btn-bet-container  not-balance"> */}
          <label htmlFor="bet" className="form-label">Amount Bet</label>
          <span className="dollars">0.00 $</span>
          <div className="input-container">
            <div className="input-logo-container">
              <input id="bet" className="ember-text-field ember-view form-control" placeholder="0.0000000" type="text"></input>
              {/* <input id="bet" className="ember-text-field ember-view form-control" placeholder="0.0000000" type="text" /> */}
              <i className="crypto-logo "   style={{
                    width: "24px",
                    height: "24px",
                    backgroundImage:
                      "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Crect width=\"20\" height=\"20\" rx=\"10\" fill=\"%2350AF95\"/%3E%3Cpath fillRule=\"evenodd\" clipRule=\"evenodd\" d=\"M11.4878 10.3747C11.4171 10.3802 11.0518 10.4028 10.2369 10.4028C9.58878 10.4028 9.1286 10.3826 8.96715 10.3747C6.46236 10.2607 4.59276 9.8096 4.59276 9.26948C4.59276 8.72937 6.46236 8.27886 8.96715 8.16304V9.92542C9.13096 9.93762 9.59998 9.96627 10.2481 9.96627C11.0259 9.96627 11.4154 9.93274 11.4855 9.92603V8.16426C13.985 8.27947 15.8505 8.73059 15.8505 9.26948C15.8505 9.80838 13.9856 10.2595 11.4855 10.3741L11.4878 10.3747ZM11.4878 7.98198V6.40492H14.976V4H5.47895V6.40492H8.96656V7.98137C6.13181 8.1161 4 8.69706 4 9.39323C4 10.0894 6.13181 10.6698 8.96656 10.8051V15.8588H11.4873V10.8033C14.3155 10.6685 16.4438 10.0882 16.4438 9.39262C16.4438 8.69706 14.3173 8.11671 11.4873 7.98137L11.4878 7.98198Z\" fill=\"white\"/%3E%3C/svg%3E')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                  }}></i>
            </div>
            <button className="btn bet-btn bet-two" type="button">½</button>
            <button className="btn bet-btn" type="button">2x</button>           
          </div>
        </div>
        <div className="mb-3 bet-start">
          <button className="btn btn-primary" onClick = {btnActive} type="button">{textButton}</button>
        </div>
      </div>
    </section>
    <section className="white none-padding">
      <div className="row align-items-start">
        <div className="mb-3 bet-container">
          <label className="form-label">Bombs</label>
          <select className="form-select form-control" id="bombContainer" aria-label="Количество бомб">
            <option>1</option>
            <option>2</option>
            <option defaultValue>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="container-switch">
            <div className="level  active-level" data-ember-action="" data-ember-action-37="37">Manual Mode
            </div>
            <div className="level " data-ember-action="" data-ember-action-38="38">Auto Mode</div>
          </div>
        </div>
      </div>
      <div className="footer-game">
        <div className="row">
          <div className="col col-3">
            <div className="row icons-container">
              <div className="col">
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle dropdown-svg-icon" id="dropdownMenuOptions" data-bs-auto-close="outside" data-bs-toggle="dropdown" aria-expanded="false" type="button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_69_2860)">
                        <path d="M19.3087 14.284L19.306 14.2813L18.2807 13.3393C18.3153 13.0553 18.3333 12.774 18.3333 12.5C18.3333 12.226 18.3153 11.9447 18.2807 11.6607L19.3087 10.716C19.4737 10.5605 19.5819 10.3542 19.6157 10.1299C19.6496 9.9057 19.6072 9.6766 19.4953 9.47933L18.364 7.52333C18.2496 7.32574 18.0713 7.17302 17.8585 7.09037C17.6457 7.00771 17.4111 7.00006 17.1933 7.06867L15.8627 7.48867C15.4204 7.14256 14.9325 6.85922 14.4127 6.64667L14.1053 5.28067C14.0551 5.05999 13.9317 4.86277 13.7553 4.72105C13.5788 4.57933 13.3596 4.50143 13.1333 4.5H10.8667C10.404 4.5 9.99532 4.82867 9.89465 5.28L9.58732 6.64667C9.06752 6.85922 8.57957 7.14256 8.13732 7.48867L6.80532 7.06867C6.35666 6.92933 5.86265 7.11933 5.63865 7.51933L4.50265 9.48333C4.27465 9.89 4.35199 10.3967 4.69465 10.7187L5.71999 11.6607C5.68465 11.9447 5.66665 12.226 5.66665 12.5C5.66665 12.774 5.68465 13.0553 5.71932 13.3393L4.69132 14.284C4.52619 14.4393 4.41802 14.6456 4.38416 14.8697C4.35031 15.0938 4.39275 15.3229 4.50465 15.52L5.63599 17.476C5.86265 17.88 6.35466 18.0713 6.80665 17.9313L8.13732 17.5113C8.57957 17.8574 9.06752 18.1408 9.58732 18.3533L9.89465 19.7187C9.94475 19.9395 10.068 20.1368 10.2445 20.2787C10.421 20.4205 10.6402 20.4985 10.8667 20.5H13.1333C13.596 20.5 14.0047 20.1713 14.1053 19.72L14.4127 18.3533C14.9326 18.141 15.4206 17.8577 15.8627 17.5113L17.1947 17.9313C17.6447 18.072 18.1373 17.88 18.362 17.48L19.498 15.516C19.6087 15.319 19.6502 15.0907 19.6159 14.8673C19.5815 14.644 19.4734 14.4386 19.3087 14.284ZM12 15.8333C10.162 15.8333 8.66666 14.338 8.66666 12.5C8.66666 10.662 10.162 9.16667 12 9.16667C13.838 9.16667 15.3333 10.662 15.3333 12.5C15.3333 14.338 13.838 15.8333 12 15.8333Z" fill="#A8C5EA"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_69_2860">
                          <rect width="16" height="16" fill="white" transform="translate(4 4.5)"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  <ul className="dropdown-menu menu-options fade-in" aria-labelledby="dropdownMenuOptions">
                    <li style={{marginTop: 0}} className="actived" data-ember-action="" data-ember-action-39="39"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.0824 4.91829C18.6834 4.61903 18.1846 4.61903 17.7856 4.91829C17.3866 5.31729 17.2868 5.91579 17.6858 6.31479C20.7781 9.40705 20.7781 14.4943 17.6858 17.5866C17.2868 17.9856 17.2868 18.5841 17.6858 18.9831C17.8853 19.1826 18.0848 19.2823 18.3841 19.2823C18.6833 19.2823 18.8829 19.1826 19.0824 18.9831C22.9726 15.1926 22.9726 8.80855 19.0824 4.91829Z" fill="#1C2938"></path>
                      <path d="M16.1896 7.81067C15.7906 7.51142 15.2918 7.51142 14.8928 7.81067C14.4938 8.20967 14.3941 8.80817 14.7931 9.20717C16.3891 10.8032 16.3891 13.2969 14.7931 14.8929C14.3941 15.2919 14.3941 15.8904 14.7931 16.2894C14.9926 16.4889 15.1921 16.5887 15.4913 16.5887C15.7906 16.5887 15.9901 16.4889 16.1896 16.2894C18.5836 13.8954 18.5836 10.1049 16.1896 7.81067ZM11.4016 4.11991C11.0026 3.9204 10.6035 4.02016 10.3043 4.31941L6.61354 8.01017H4.02003C2.92278 8.01017 2.02502 8.90792 2.02502 10.0052V13.9952C2.02502 15.0924 2.92278 15.9902 4.02003 15.9902H6.61354L10.3043 19.681C10.5038 19.8805 10.7033 19.9802 11.0026 19.9802C11.1023 19.9802 11.3018 19.9802 11.4016 19.8805C11.8006 19.681 12.0001 19.3817 12.0001 18.9827V5.01766C12.0001 4.61866 11.8006 4.21966 11.4016 4.11991Z" fill="#1C2938"></path>
                      </svg>
                      Sound
                    </li>
                    <li className="" data-ember-action="" data-ember-action-40="40"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.9053 3.25085C20.8892 3.17851 20.8329 3.12225 20.7646 3.10216C18.4096 2.52748 12.9723 4.57704 10.0265 7.52278C9.50007 8.04522 9.02184 8.61186 8.59585 9.21467C7.68762 9.13429 6.77938 9.20261 6.00376 9.54019C3.81756 10.5007 3.1826 13.0124 3.00176 14.0894C2.96559 14.2984 3.10625 14.4993 3.31924 14.5355C3.35541 14.5395 3.39158 14.5435 3.42775 14.5395L6.93611 14.1537C6.94013 14.4189 6.9562 14.6842 6.98434 14.9454C7.00041 15.1262 7.0848 15.299 7.2134 15.4276L8.57174 16.782C8.70034 16.9106 8.87315 16.995 9.05399 17.011C9.31521 17.0392 9.57643 17.0552 9.84166 17.0593L9.45586 20.5636C9.43175 20.7766 9.58848 20.9695 9.80148 20.9896C9.83764 20.9936 9.87381 20.9936 9.90596 20.9856C10.983 20.8128 13.4987 20.1778 14.4552 17.9916C14.7928 17.216 14.8611 16.3118 14.7847 15.4076C15.3915 14.9816 15.9582 14.4993 16.4806 13.9769C19.4344 11.0392 21.4719 5.72238 20.9053 3.25085ZM16.2556 10.4685C15.5041 11.22 14.2824 11.224 13.5309 10.4685C12.7753 9.71701 12.7753 8.49531 13.5309 7.73979C14.2824 6.98427 15.5041 6.98427 16.2596 7.73979C17.0111 8.49531 17.0111 9.71701 16.2556 10.4685Z" fill="#1C2938"></path>
                      <path d="M8.47932 17.7625C8.25828 17.9836 7.90464 18.0679 7.47865 18.1443C6.52219 18.3051 5.67825 17.4812 5.85106 16.5167C5.91536 16.151 6.11228 15.6366 6.23284 15.516C6.30116 15.4477 6.30517 15.3352 6.23686 15.2669C6.19667 15.2267 6.14443 15.2066 6.08816 15.2146C5.55367 15.2789 5.05535 15.5241 4.67758 15.9018C3.72916 16.8503 3.64075 20.3586 3.64075 20.3586C3.64075 20.3586 7.15313 20.2702 8.09753 19.3218C8.47932 18.94 8.72044 18.4457 8.78474 17.9072C8.80082 17.7424 8.59586 17.642 8.47932 17.7625Z" fill="#1C2938"></path>
                      </svg>
                      Speed
                    </li>
                    <li className="actived" data-ember-action="" data-ember-action-41="41"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.7345 11.4412L10.2139 5.58124C10.0525 5.37112 9.8449 5.20099 9.60715 5.08402C9.3694 4.96705 9.10791 4.90639 8.84295 4.90674C8.3012 4.90674 7.79995 5.15424 7.46945 5.58124L2.9492 11.4412C2.71526 11.7446 2.58838 12.1169 2.58838 12.5C2.58838 12.8831 2.71526 13.2554 2.9492 13.5587L7.46945 19.4187C7.63118 19.6291 7.83922 19.7994 8.07742 19.9164C8.31562 20.0334 8.57758 20.0939 8.84295 20.0932C9.10791 20.0936 9.3694 20.0329 9.60715 19.916C9.8449 19.799 10.0525 19.6289 10.2139 19.4187L14.7345 13.5587C14.9684 13.2554 15.0953 12.8831 15.0953 12.5C15.0953 12.1169 14.9684 11.7446 14.7345 11.4412Z" fill="#1C2938"></path>
                      <path d="M17.3924 11.4407L12.8714 5.58146C12.7099 5.37125 12.5021 5.20114 12.2641 5.08437C12.0262 4.9676 11.7645 4.90732 11.4994 4.90821V5.80721C11.7599 5.80721 12.0009 5.92546 12.1599 6.13121L16.6804 11.9895C16.7929 12.1358 16.8539 12.3152 16.8539 12.4998C16.8539 12.6844 16.7929 12.8639 16.6804 13.0102L12.1604 18.8682C12.0826 18.9695 11.9825 19.0515 11.8679 19.1078C11.7532 19.1641 11.6271 19.1931 11.4994 19.1927V20.0917C11.7646 20.0926 12.0264 20.0322 12.2645 19.9154C12.5025 19.7985 12.7104 19.6283 12.8719 19.418L17.3924 13.559C17.626 13.2553 17.7526 12.8829 17.7525 12.4998C17.7525 12.1167 17.626 11.7443 17.3924 11.4407Z" fill="#1C2938"></path>
                      <path d="M20.0505 11.4407L15.5292 5.58146C15.3677 5.37125 15.1599 5.20114 14.922 5.08437C14.684 4.9676 14.4223 4.90732 14.1572 4.90821V5.80721C14.4177 5.80721 14.6587 5.92546 14.8177 6.13121L19.3382 11.9895C19.4508 12.1358 19.5119 12.3152 19.5119 12.4998C19.5119 12.6844 19.451 12.8638 19.3385 13.0102L14.8182 18.8682C14.7405 18.9695 14.6403 19.0515 14.5257 19.1078C14.411 19.1641 14.2849 19.1931 14.1572 19.1927V20.0917C14.4224 20.0926 14.6842 20.0322 14.9223 19.9154C15.1603 19.7985 15.3682 19.6283 15.5297 19.418L20.0507 13.559C20.2843 13.2553 20.4109 12.8829 20.4109 12.4998C20.4108 12.1167 20.2841 11.7443 20.0505 11.4407Z" fill="#1C2938"></path>
                      </svg>
                      Animations
                    </li>
                    <li className="" data-ember-action="" data-ember-action-42="42"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_57_6026)">
                      <path fillRule="evenodd" clipRule="evenodd" d="M9.11479 12.1511C8.68378 13.7373 7.23253 13.4657 7.23253 13.4657C5.9997 13.2602 5.58862 11.103 5.58862 11.103C4.82043 12.0248 4.77476 15.2122 5.20411 16.4151C6.19818 19.1972 7.8122 20.8976 10.5166 21.5005C8.96406 20.3063 9.14012 18.4647 9.4258 17.8921C9.98055 18.6046 10.4813 18.598 10.7903 18.4821C11.3425 18.2749 11.0556 16.9404 11.1316 16.396C11.3355 14.9431 12.418 14.1014 12.418 14.1014C12.2934 15.5938 13.1766 16.0979 13.8875 17.0525C14.7865 18.2596 15.1282 20.065 14.2487 21.3485C17.0109 20.369 18.328 17.6778 18.328 17.6778C20.3826 13.1576 17.5058 8.53438 17.5058 8.53438C16.376 11.2056 14.7321 10.7945 14.7321 10.7945C12.6281 10.2456 12.8864 7.49712 12.9682 6.90167C13.1044 5.90926 13.5163 4.33885 12.6775 3.50049C12.5749 4.63034 12.3694 5.24696 11.2391 5.76061C7.75697 7.34348 9.61141 10.3228 9.11479 12.1511Z" fill="#1C2938"></path>
                      </g>
                      <defs>
                      <clipPath id="clip0_57_6026">
                      <rect width="18" height="18" fill="white" transform="translate(3 3.5)"></rect>
                      </clipPath>
                      </defs>
                      </svg>
                      Max Bet
                    </li>
                    <li data-ember-action="" data-ember-action-43="43">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.9026 6.77101C17.9485 6.8172 17.9798 6.87594 17.9924 6.93984C18.005 7.00373 17.9984 7.06993 17.9734 7.13009C17.9485 7.19025 17.9063 7.24168 17.8522 7.27791C17.7981 7.31414 17.7344 7.33354 17.6693 7.33368H15.9933C15 7.33368 14.6666 6.66701 14.6666 6.00701V4.33168C14.6666 4.03768 15.022 3.89035 15.23 4.09835L17.9026 6.77101Z" fill="#1C2938"></path>
                      <path fillRule="evenodd" clipRule="evenodd" d="M6 6.66699C6 6.13656 6.21071 5.62785 6.58579 5.25278C6.96086 4.87771 7.46957 4.66699 8 4.66699H13C13.0884 4.66699 13.1732 4.70211 13.2357 4.76462C13.2982 4.82714 13.3333 4.91192 13.3333 5.00033V7.14033C13.3333 7.49395 13.4738 7.83309 13.7239 8.08313C13.9739 8.33318 14.313 8.47366 14.6667 8.47366H17.6667C17.7551 8.47366 17.8399 8.50878 17.9024 8.57129C17.9649 8.6338 18 8.71859 18 8.80699V18.0003C18 18.5308 17.7893 19.0395 17.4142 19.4145C17.0391 19.7896 16.5304 20.0003 16 20.0003H8C7.46957 20.0003 6.96086 19.7896 6.58579 19.4145C6.21071 19.0395 6 18.5308 6 18.0003V6.66699ZM8.86667 10.667C8.81362 10.667 8.76275 10.6881 8.72525 10.7256C8.68774 10.7631 8.66667 10.8139 8.66667 10.867V11.8003C8.66667 11.8534 8.68774 11.9042 8.72525 11.9417C8.76275 11.9793 8.81362 12.0003 8.86667 12.0003H13.8C13.853 12.0003 13.9039 11.9793 13.9414 11.9417C13.9789 11.9042 14 11.8534 14 11.8003V10.867C14 10.8139 13.9789 10.7631 13.9414 10.7256C13.9039 10.6881 13.853 10.667 13.8 10.667H8.86667ZM8.86667 13.3337C8.81362 13.3337 8.76275 13.3547 8.72525 13.3922C8.68774 13.4297 8.66667 13.4806 8.66667 13.5337V14.467C8.66667 14.52 8.68774 14.5709 8.72525 14.6084C8.76275 14.6459 8.81362 14.667 8.86667 14.667H15.1333C15.1596 14.667 15.1856 14.6618 15.2099 14.6518C15.2341 14.6417 15.2562 14.627 15.2748 14.6084C15.2933 14.5898 15.3081 14.5678 15.3181 14.5435C15.3282 14.5193 15.3333 14.4933 15.3333 14.467V13.5337C15.3333 13.5074 15.3282 13.4814 15.3181 13.4571C15.3081 13.4329 15.2933 13.4108 15.2748 13.3922C15.2562 13.3737 15.2341 13.3589 15.2099 13.3489C15.1856 13.3388 15.1596 13.3337 15.1333 13.3337H8.86667ZM8.66667 16.2003C8.66667 16.1741 8.67184 16.1481 8.68189 16.1238C8.69194 16.0995 8.70667 16.0775 8.72525 16.0589C8.74382 16.0403 8.76586 16.0256 8.79013 16.0155C8.8144 16.0055 8.8404 16.0003 8.86667 16.0003H12.4667C12.4929 16.0003 12.5189 16.0055 12.5432 16.0155C12.5675 16.0256 12.5895 16.0403 12.6081 16.0589C12.6267 16.0775 12.6414 16.0995 12.6514 16.1238C12.6615 16.1481 12.6667 16.1741 12.6667 16.2003V17.1337C12.6667 17.1867 12.6456 17.2376 12.6081 17.2751C12.5706 17.3126 12.5197 17.3337 12.4667 17.3337H8.86667C8.81362 17.3337 8.76275 17.3126 8.72525 17.2751C8.68774 17.2376 8.66667 17.1867 8.66667 17.1337V16.2003Z" fill="#1C2938"></path>
                      </svg>
                      Game Information
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col">
                
                <div className="dropup">
                  <button className="btn btn-secondary dropdown-toggle dropdown-svg-icon" id="dropdownMenuDiagras" data-bs-auto-close="outside" data-bs-toggle="dropdown" aria-expanded="false" type="button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.2204 16.4006V19.3184C4.2204 19.4959 4.36462 19.6438 4.54583 19.6438H6.80164C6.97915 19.6438 7.12707 19.4996 7.12707 19.3184V14.1855L5.48883 15.8237C5.14121 16.1677 4.69745 16.3674 4.2204 16.4006ZM8.25128 14.1485V19.3184C8.25128 19.4959 8.3955 19.6438 8.57671 19.6438H10.8325C11.01 19.6438 11.158 19.4996 11.158 19.3184V16.2749C10.6439 16.2638 10.1632 16.0604 9.80077 15.698L8.25128 14.1485ZM12.2822 15.9532V19.3184C12.2822 19.4959 12.4264 19.6438 12.6076 19.6438H14.8634C15.0409 19.6438 15.1888 19.4996 15.1888 19.3184V13.1094L12.6039 15.6943C12.504 15.7942 12.3968 15.8792 12.2822 15.9532ZM19.0015 9.29297L16.313 11.9815V19.3184C16.313 19.4959 16.4573 19.6438 16.6385 19.6438H18.8943C19.0718 19.6438 19.2197 19.4996 19.2197 19.3184V9.49636C19.1458 9.43349 19.0903 9.37802 19.0496 9.34104L19.0015 9.29297Z" fill="#A8C5EA"></path>
                      <path d="M20.8468 4.52977C20.7396 4.41513 20.5769 4.35596 20.3698 4.35596H20.3106C19.2604 4.40403 18.2138 4.4558 17.1636 4.50388C17.023 4.51128 16.8307 4.51867 16.6791 4.67029C16.631 4.71837 16.5941 4.77384 16.5645 4.8404C16.4092 5.17693 16.6273 5.39511 16.7309 5.49866L16.9934 5.76492C17.1747 5.94982 17.3596 6.13472 17.5445 6.31593L11.1986 12.6655L8.34739 9.81429C8.17728 9.64418 7.948 9.54803 7.70393 9.54803C7.45986 9.54803 7.23428 9.64418 7.06417 9.81429L3.26626 13.6085C2.91125 13.9635 2.91125 14.5367 3.26626 14.8917L3.43637 15.0618C3.60648 15.2319 3.83576 15.3281 4.07983 15.3281C4.3239 15.3281 4.54949 15.2319 4.7196 15.0618L7.70393 12.0775L10.5551 14.9287C10.7252 15.0988 10.9545 15.195 11.1986 15.195C11.4427 15.195 11.6682 15.0988 11.8421 14.9287L19.0015 7.76926L19.8114 8.57544C19.9075 8.67159 20.0406 8.80472 20.244 8.80472C20.3291 8.80472 20.4142 8.78253 20.5029 8.73446C20.5621 8.70117 20.6138 8.66419 20.6582 8.61982C20.8172 8.4608 20.8468 8.25741 20.8542 8.09839C20.8838 7.41795 20.9171 6.73751 20.9504 6.05337L20.9984 5.029C21.0095 4.81452 20.9615 4.6481 20.8468 4.52977Z" fill="#A8C5EA"></path>
                    </svg>
                  </button>
                  <div className="dropdown-menu dropdown-diagram p-4 text-muted fade-in" aria-labelledby="dropdownMenuDiagras">
                    <div className="header-dropdown">Current Statistics</div>
                    <div className="statistic-container">
                      <div className="stats-numbers">
                        <label htmlFor="">Profit</label>
                        <span className="profit">0.00000000 <i className="crypto-logo"   style={{
                                width: "40px",
                                height: "40px",
                                backgroundImage:
                                  "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Crect width=\"20\" height=\"20\" rx=\"10\" fill=\"%2350AF95\"/%3E%3Cpath fillRule=\"evenodd\" clipRule=\"evenodd\" d=\"M11.4878 10.3747C11.4171 10.3802 11.0518 10.4028 10.2369 10.4028C9.58878 10.4028 9.1286 10.3826 8.96715 10.3747C6.46236 10.2607 4.59276 9.8096 4.59276 9.26948C4.59276 8.72937 6.46236 8.27886 8.96715 8.16304V9.92542C9.13096 9.93762 9.59998 9.96627 10.2481 9.96627C11.0259 9.96627 11.4154 9.93274 11.4855 9.92603V8.16426C13.985 8.27947 15.8505 8.73059 15.8505 9.26948C15.8505 9.80838 13.9856 10.2595 11.4855 10.3741L11.4878 10.3747ZM11.4878 7.98198V6.40492H14.976V4H5.47895V6.40492H8.96656V7.98137C6.13181 8.1161 4 8.69706 4 9.39323C4 10.0894 6.13181 10.6698 8.96656 10.8051V15.8588H11.4873V10.8033C14.3155 10.6685 16.4438 10.0882 16.4438 9.39262C16.4438 8.69706 14.3173 8.11671 11.4873 7.98137L11.4878 7.98198Z\" fill=\"white\"/%3E%3C/svg%3E')",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                              }}></i></span>
                        <label className="mt-3" htmlFor="">Turnover</label>
                        <span>0.00000000 <i className="crypto-logo"   style={{
                                  width: "40px",
                                  height: "40px",
                                  backgroundImage:
                                    "url('data:image/svg+xml,%3Csvg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Crect width=\"20\" height=\"20\" rx=\"10\" fill=\"%2350AF95\"/%3E%3Cpath fillRule=\"evenodd\" clipRule=\"evenodd\" d=\"M11.4878 10.3747C11.4171 10.3802 11.0518 10.4028 10.2369 10.4028C9.58878 10.4028 9.1286 10.3826 8.96715 10.3747C6.46236 10.2607 4.59276 9.8096 4.59276 9.26948C4.59276 8.72937 6.46236 8.27886 8.96715 8.16304V9.92542C9.13096 9.93762 9.59998 9.96627 10.2481 9.96627C11.0259 9.96627 11.4154 9.93274 11.4855 9.92603V8.16426C13.985 8.27947 15.8505 8.73059 15.8505 9.26948C15.8505 9.80838 13.9856 10.2595 11.4855 10.3741L11.4878 10.3747ZM11.4878 7.98198V6.40492H14.976V4H5.47895V6.40492H8.96656V7.98137C6.13181 8.1161 4 8.69706 4 9.39323C4 10.0894 6.13181 10.6698 8.96656 10.8051V15.8588H11.4873V10.8033C14.3155 10.6685 16.4438 10.0882 16.4438 9.39262C16.4438 8.69706 14.3173 8.11671 11.4873 7.98137L11.4878 7.98198Z\" fill=\"white\"/%3E%3C/svg%3E')",
                                  backgroundRepeat: "no-repeat",
                                  backgroundSize: "contain",
                                  backgroundPosition: "center",
                                }}></i></span>
                      </div>
                      <div className="stats-wins">
                        <label htmlFor="">Winnings</label>
                        <span className="profit">0</span>
                        <label className="mt-3" htmlFor="">Losses</label>
                        <span className="lose">0</span>
                      </div>
                    </div>
                    <div className="statistic-container">
                      <div>
                        <div id="ember44" className="ember-view"><canvas id="diagmrams" width="0" height="0"   style={{
                            display: "block",
                            boxSizing: "border-box",
                            height: 0,
                            width: 0
                          }}></canvas></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col col">
            <a className="honesty-btn" data-ember-action="" data-ember-action-45="45">Fairness</a>
          </div>
        </div>
      </div>
    </section>
    <section className="white history-bets mt-3 section-header">
      <div className="row">
        <div className="col">
          <div className="container-switch">
            <div className="level  active-level" data-ember-action="" data-ember-action-46="46">Players History
            </div>
            <div className="level " data-ember-action="" data-ember-action-47="47">Personal history</div>
          </div>
        </div>
      </div>
    </section>
    
      <div id="ember48" className="ember-view"><section className="white history-bets section-body">
  <h3 className="section-title">Players' betting history</h3>
  <div className="history-header">
    <div className="bet-history-header">
      <div className="block-col date-history-bet">User</div>
      <div className="block-col number-history-bet-kef-ber">Bet</div>
      <div className="block-col number-history-bet-kef">Odds</div>
      <div className="block-col score-history-bet">Winning</div>
    </div>
  </div>
  <div className="history-container">
</div>
</section>
</div>
    
  </div>
</div>
<div aria-live="polite" aria-atomic="true" className="bg-dark position-relative bd-example-toasts">
  <div className="toast-container position-fixed p-3 fade-in" style={{ top: 44 }} id="toastPlacement">
    <div className="toast toast-copy align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="d-flex">
        <div className="toast-body">
        Successfully copied
      </div>
        <button className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" type="button"></button>
      </div>
    </div>
    <div className="toast toast-error align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="d-flex">
        <div className="toast-body">
        You cannot place a bet that exceeds your balance.
      </div>
        <button className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" type="button"></button>
      </div>
    </div>
  </div>
</div>
</div>
</>
  )
}

export default App
