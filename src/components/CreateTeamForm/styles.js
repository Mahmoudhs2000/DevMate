import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;

  hr {
    margin: 15px 0 35px;
    width: 40vw;
    height: 2px;
  }
`;
const Form = styled.form`
  width: 40vw;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .MuiFormControl-root {
    margin: 20px 0;
    width: 45%;
  }
  button {
    font-weight: bold !important;
    margin: 30px 0 !important;
  }
`;
const ImageUpload = styled.div`
  width: 155px;
  height: 155px;
  border-radius: 50%;
  background: #0000009e;
  display: grid;
  place-items: center;
  cursor: pointer;
  position: relative;

  svg {
    width: 28%;
    height: 28%;

    path {
      color: #ffffffb5;
    }
  }

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 50%;
    opacity: 0.8;
  }
`;

export { Container, Form, ImageUpload };
