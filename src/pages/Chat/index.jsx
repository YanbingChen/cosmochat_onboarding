import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import Images from '../../constants/images';
import ChatStyles from "../../styles/chat";
import {RexMessage} from "../../components/RexMessage";
import {api} from "../../api/sessions";
import OpenAI from "openai";
import { useParams } from 'react-router-dom';
import UserMessage from "../../components/UserMessage";
import useMediaQuery from '@mui/material/useMediaQuery';

const Chat = () => {
  const {id} = useParams();
  const [userPrompt, setUserPrompt] = useState("");
  const [reXReply, setReXReply] = useState("");
  const [sessions, setSessions] = useState([]);
  const [thisSession, setThisSession] = useState({});  
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const openai = new OpenAI({apiKey: API_KEY, dangerouslyAllowBrowser: true});
  const matches = useMediaQuery('(min-width:600px)');
  let chatKeys = [];

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await api.get(`/sessions`);
        setSessions(response.data);
        setThisSession(
          response.data.find(
            (session) => parseInt(session?.id, 10) === parseInt(id, 10)
          )
        );
        handleScroll();
        window.addEventListener("scroll", handleScroll);
      } catch (error) {
        if(error.response){
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else {
          console.log(error);
        }
      }
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    };
    fetchSessions();
  }, []);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedSessions = {};

    setTimeout(async function () {
      const date = new Date();
      const month = date.getMonth();
      const day = date.getDate();
      const year = date.getFullYear();
      const formattedDate = months[month] + " " + day + ", " + year;
      callOpenAIAPI();
      thisSession.chats.push({user: userPrompt, ReX: reXReply });
      updatedSession = {
        id: id,
        date: formattedDate,
        chats: thisSession.chats,
        isSessionEnded: thisSession.isSessionEnded,
      };
      for(let i = 0; i < updatedSession.chats.length; i++) {
        chatKeys.push(Object.keys(updatedSession.chats[i]));
      }

      try {
        const response = await api.patch(`/sessions/${id}`, updatedSession);
        setSessions(
          sessions.map((session) =>
            session.id == id ? response.data : session
          )
        );
        setUserPrompt("");
      } catch(error) {
        console.log('Error: ${error.message}');
      }
    }, 5000);
  };

  async function callOpenAIAPI() {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: 
            "Your name is ReX. You are a career advice assistant. You give advice to Andrew about his career."
        },
      ],
      model: "gpt-3.5-turbo",
      max_tokens: 100,
    });

    setReXReply(completion.choices[0].message.content);
  }

  return (
    <Grid container style={{ display = matches ? "none": "block"}}>
      <Grid style={{ padding: "40px 24px 24px 24px", position: "sticky"}}>
        <img src={Images.HomRex} alt="ReX" style={{width:"105px"}} />
      </Grid>
      <Grid {...ChatStyles.textDisplayBackground}>
        <Grid>
          {thisSession?.chats?.length
            ? thisSession?.chats.map((chat, i) =>
              Object.keys(chat).map((k) =>
                k === "ReX" ? (
                  <RexMessage rexMessage = {chat.Rex} key={"rex"+i} />
                ) : (
                  <UserMessage userMessage = {chat.user} key={"user"+i} />
                )
              )
            )
          : null}
        </Grid>
      </Grid>
      // missing code
      <Grid item>
        <form onSubmit={handleSubmit}>
          <Textarea
            minRows={3}
            placeholder="Type your message here..."
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            style={{ width: '100%' }}
          />
          <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
            Send
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};


export default Chat;