import React from 'react';
import Cardjob from '../components/cardjob';

function Hiring() {
  return (
      <div className='hiring'>
        <h1 className="heading">Join our Family Now!!</h1>
        <h2 className='heading2'>We are the first to sell websites with hosting and domains in the world,<br /> and our independence from other organizations and institutions will provide<br /> you with unprecedented freedom to create, learn, and contribute. Whether your<br /> interests lie in business, community, or developement, join us today and empower <br /> our generation to revolutionize our future!</h2>
        <br />
        <hr />
            <h1 className="heading1">Jobs</h1>
            <Cardjob name='Software Developer' url='https://cdn.discordapp.com/attachments/749964857524224060/937964620130418688/2842680.jpg'/>
            <Cardjob name='Tester' url='https://cdn.discordapp.com/attachments/749964857524224060/937964620130418688/2842680.jpg'/>
            <Cardjob name='Marketing Officer' url='https://cdn.discordapp.com/attachments/749964857524224060/938432798807715930/547.jpg'/>
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><hr />
      </div>
  );
}

export default Hiring;
