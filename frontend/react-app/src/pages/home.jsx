// src/pages/home.jsx
import NavigationBar from '../components/homepage/navigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/landingPage.css";
import Intro from '../components/homepage/intro';
import Footer from '../components/homepage/footer';
import SearchApp from '../components/search/searchApp';

const HomePage = ({ isLoggedIn }) => {
  return (
    <div>
      <div id='navbar'>
        <NavigationBar isLoggedIn={isLoggedIn} />
      </div>

      <div id='intro'>
        <Intro />
      </div>

      <div id='searchApp'>
        <SearchApp />
      </div>
      
      <div id='footer'>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;