import styled from "styled-components";

const About = () => {
    return (
        
        <AboutContainer>
          <AboutHeader>About Us</AboutHeader>
          <AboutText>
            Welcome to BildeoPC, your one-stop shop for all your computer hardware needs. We are passionate about providing our customers with the best possible shopping experience, and we are committed to offering top-quality products at affordable prices.
          </AboutText>
          <AboutSectionHeader>Our History</AboutSectionHeader>
          <AboutText>
            BildeoPC was founded in 2005 by John Smith, a computer enthusiast who saw a need for a more convenient and reliable way to purchase computer parts online. Over the years, we have grown from a small startup to a thriving business with thousands of satisfied customers.
          </AboutText>
          <AboutSectionHeader>Our Mission</AboutSectionHeader>
          <AboutText>
            Our mission at BildeoPC is simple: to provide our customers with the best possible shopping experience. We strive to offer a wide selection of high-quality products, competitive prices, and exceptional customer service. Whether you are a seasoned computer builder or a first-time buyer, we are here to help you find the perfect parts for your needs.
          </AboutText>
          <AboutSectionHeader>Our Team</AboutSectionHeader>
          <AboutText>
            At BildeoPC, we are proud to have a team of experienced and knowledgeable professionals who are passionate about technology. From our sales representatives to our customer service agents, everyone on our team is committed to providing our customers with the best possible shopping experience.
          </AboutText>
        </AboutContainer>
    )
  }
  
  export default About

  const AboutContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const AboutHeader = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #444;
`;

const AboutSectionHeader = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 20px;
  color: #444;
`;

const AboutText = styled.p`
  font-size: 18px;
  line-height: 1.5;
  color: #666;
  margin-bottom: 20px;
`;
