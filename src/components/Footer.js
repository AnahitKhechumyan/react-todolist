import {Fragment} from 'react';

const SocialIcons = () => {
    return (
      <Fragment>
        <a href="https://www.facebook.com/profile.php?id=100004908039843" target="_blank" rel="noreferrer" >
          <i className="facebook icon"></i>
        </a>
        <a href="https://www.linkedin.com/in/anahit-khechumyan-259176205" target="_blank" rel="noreferrer">
          <i className="linkedin icon"></i>
        </a>
      </Fragment>
    );
  }
  
export  const Footer = (props)=>{
    return (
      <div className="ui segment">
        <h4>{props.timing}</h4>
        <SocialIcons/>
      </div>
    );
  }