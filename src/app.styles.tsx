import styled from "styled-components";
import theme from "./theme";

export const Wrapper = styled.section`
	z-index: 999999;
	position: fixed;
	width: 350px;
	top: 15vh;
	left: calc(50vw - (350px / 2));

	background-color: ${({ theme }) => theme.colours.background};
	color: ${({ theme }) => theme.colours.text};
	box-shadow: 0 0 30px 15px rgba(0, 0, 0, 0.3);
`;
