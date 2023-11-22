import styled, { ThemeProvider } from "styled-components";
import { Menu } from "./components/Menu";
import { Navbar } from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Video } from "./pages/Video";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Search } from "./pages/Search";
import { Others } from "./pages/Others";


const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 3vh 2vw;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const isMobile = window.innerWidth <= 768;
  const [menuVisible, setMenuVisible] = useState(!isMobile);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          <Menu menuVisible={menuVisible} setMenuVisible={setMenuVisible} darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar menuVisible={menuVisible} setMenuVisible={setMenuVisible}/>
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={<Home type="random"/>} />
                  <Route path="trends" element={<Home type="trend" />} />
                  <Route path="others" element={<Others />} />
                  <Route path="subscriptions" element={<Home type="sub"/>} />
                  <Route path="search" element={<Search/>} />
                  <Route path="signin" element={<SignIn />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
