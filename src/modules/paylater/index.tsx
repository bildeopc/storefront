import styled from "styled-components";

const PayLater = () => {
  return (
    <AboutContainer>
      <AboutHeader>Welcome to PayLater!</AboutHeader>
      <AboutText>
      The one-stop-shop for all your shopping needs when your wallet is feeling a little light. 
      Here at PayLater, we understand that being poor can be a bummer, but don't worry, we've got you covered!
        </AboutText>
        <AboutText>
        With PayLater, you can buy anything you want, regardless of whether or not you can actually afford it. 
        And the best part? You don't have to pay for it now! We'll give you a little break and let you pay it off later. Don't worry about the interest rates, just enjoy your new purchase and worry about the consequences later.
          </AboutText>
          <AboutText>
          So, if you're feeling a little down on your luck financially, come on over to PayLater and treat yourself! 
          After all, you deserve it, and you can always worry about the payments later.          
          </AboutText>
      <p>Note: This is meant to be a lighthearted and humorous take on buy now, pay later services. 
        We understand that financial struggles are a serious matter and should be dealt with responsibly.
        </p>
    </AboutContainer>
  );
};

export default PayLater;

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
