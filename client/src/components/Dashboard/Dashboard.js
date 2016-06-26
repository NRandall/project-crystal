import React from 'react';
import Header from '../App/Header';
import Meter from '../Meter/Meter';
import ChatCard from '../Chat/ChatCard';
// export default class Dashboard extends Component {
export default () =>
  (
  <div>
    <Header />
    <Meter />
    <ChatCard />
  </div>
  );
