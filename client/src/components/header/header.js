import React, { useRef } from "react";
import styled from "styled-components";
import { COLORS } from "../styles/Colors";
// This is the full logo with text
import logo from "../../public/WE_LOGO.png";
// This is the IMG portion of logo only
import imgLogo from "../../public/IMG_Logo.png";
// React Icons being used
import { BiSearchAlt } from "react-icons/bi";
// import { FaShoppingCart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { InputForm } from "../homepage/InputForm";
import TypeAhead from "./TypeAhead";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  return (
    <Wrapper>
      <Logo src={logo} />
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  z-index: 100;
  transition: height 0.5ms;
`;

const Logo = styled.img`
  height: 150px;
  width: 150px;
`;

const Nav = styled.nav`
  width: 750px;
  display: flex;
  justify-content: space-evenly;
`;

const A = styled(Link)`
  color: ${COLORS.PURPLE.PRIMARY};
`;

const CartItemNumDisplay = styled.span`
  height: 20px;
  width: 20px;
  position: absolute;
  background-color: ${COLORS.BLUE.PRIMARY};
  color: white;
  border-radius: 50%;
  padding: 7px;
  font-size: 10px;
  font-weight: bold;
  left: 80%;
`;

const ImgLogo = styled.img`
  height: 35px;
`;

const Input = styled.input`
  background: ${COLORS.BLUE.PRIMARY};
  color: ${COLORS.BACKGROUND.PRIMARY};
  padding: 3px 8px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
`;

const Button = styled.button`
  color: ${COLORS.PURPLE.PRIMARY};
  background: none;
  border: none;
`;
