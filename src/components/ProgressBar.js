import styled from 'styled-components'

export const ProgressBar = styled.div`
  width: 100%;
  height: 7px;
  border-radius: 10px;
  background: #e8eef4;
  margin-top: 20px;
  position: relative;

  div {
    max-width : 100%;
    width: ${(props) => props.percentage}%;
    transition: width 1s, background-color 1s;
    height: 100%;
    background-color: ${(props) => props.percentage < 100 ? '#f17d7d' : '#53a653'} ;
  }
`;