'use client'

require('dotenv').config();


import Groq from "groq-sdk";
import { useState } from "react";
import styles from "./page.module.css";
import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { Black_And_White_Picture } from "next/font/google";



export default function Home() {

 const [open, setOpen] = useState(false);
 const [bOpen, setBOpen] = useState('block');
 const [question, setQuestion] = useState('');


 const Groq = require('groq-sdk');
 const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_API_KEY, dangerouslyAllowBrowser: true });

 const openChat = () => setOpen(true);
 const closeChat = () => setOpen(false);

 const openButton = () => setBOpen('Block');
 const closeButton = () => setBOpen('none');

 async function sendQuestion() {
  if(question === '')
    return;

  const response = await groq.chat.completions.create({
    "messages": [
      {
        "role": "user",
        "content": question
      }
    ],
    "model": "llama3-8b-8192",
    "temperature": 1,
    "max_tokens": 1024,
    "top_p": 1,
    "stream": false,
    "stop": null
  });
  setQuestion("");

 }  

  return (
    <Box
    display='grid'
    gridTemplateRows='auto 1fr auto'
    minHeight='100vh'
    bgcolor='deepskyblue'
    >
      <Box
      display='flex'
      flexDirection='row'
      justifyContent='space-between'
      padding='20px'
      bgcolor='white'
      >
        <Typography>Chat Support</Typography>
        <Typography>About</Typography>
      </Box>
      <Stack
      display='flex'
      flexDirection='row'
      gap={5}
      >
        <Box 
        
        padding='20px'
        bgcolor='turquoise'
        >
          This is the side bar
        </Box>
        <Box flex={1} position='relative'>
          <Stack>
            This is where the content goes 
          </Stack>
          <Stack
          position='absolute'
          bottom='0'
          right='0'
          padding='20px'
          >
            <Modal
            open={open}
            onClose={() => {
              closeChat();
              openButton();
            }}
            >
              <Box
              position="absolute"
              top='40%'
              right="10%"
              width={400}
              height={400}
              p={4}
              display='flex'
              flexDirection='column'
              gap={2}
              >
                <Box
                flex={1}
                fullWidth
                boxShadow={5}
                >

                </Box>

                <Box
                boxShadow={5}
                display='flex'
                flexDirection='row'
                >
                  <TextField
                  variant="outlined"
                  fullWidth
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  >
                  </TextField>   
                  <Button 
                  variant="outlined" 
                  onClick={sendQuestion}
                  sx={{
                    color:'black'
                  }}
                  >
                    Send
                  </Button>     
                </Box>
                
              </Box>
            </Modal>
            
            <Button 
            style={{ display: bOpen }}
            fullWidth='50px'
            variant="outlined"
            onClick={() => {
              openChat();
              closeButton();
              console.log(bOpen)
            }}
            >
              Chat me
            </Button>
          </Stack>
        </Box>
      </Stack>
      <Box
      padding='20px'
      bgcolor='white'
      display='flex'
      justifyContent='center'

      >
        <Typography>This project is part of HeadStarter Fellowship</Typography>
      </Box>

    </Box>
  );
}
