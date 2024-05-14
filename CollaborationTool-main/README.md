# Introduction
I am excited to introduce a seamless and intuitive way for me to unleash  creativity and communicate ideas visually. With user-friendly interface effortlessly create diagrams with a touch of finger or the precision of mouse.

Imagine having the freedom to brainstorm ideas, map out strategies, or present complex information in a visually captivating manner. Collaboration is at the heart of this website, allowing to work seamlessly with others in real-time. Whether working on a team project or seeking feedback from colleagues,collaborative features ensure that everyone is on the same page.

### Description

Collabwrite is inspired by a popular tool [Excalidraw](https://excalidraw.com/), which is a versatile and intuitive web-based tool that allows users to effortlessly create diagrams, sketches, and illustrations.

At its core, Collabwrite provides a blank canvas where you can draw and sketch using a variety of tools. The interface is clean and has a chat built into it to enable people to collaborate and brainstorm ideas (Thanks to Appwrite Realtime Database).

# Tech Stack

Frontend - [**NextJS**](https://nextjs.org/)

Styling - [**TailwindCSS**](https://tailwindcss.com/)

Backend & Auth & Database - [**Appwrite**](https://appwrite.io/)

Deployment - [**Vercel**](https://vercel.com/dashboard)

# Features

-   Use the canvas to draw to content. Create plans, diagrams, flowcharts, etc.
    
-   Go solo or collab with people to work together .
    
-   Collabwrite provides realtime editing so multiple people can work together on a canvas remotely and edit it simultaneously.
    
-   Chat with teammates while working on canvas on an inbuilt chat system, ask them for ideas or even better let them edit the canvas themselves.
    
-   Finally, download your canvas and use them anywhere
    

# The general flow of the application

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686607944692/e8a5602c-6b6a-46b8-b884-5a4fbfc71042.jpeg?auto=compress,format&format=webp)

_btw the above diagram is made using_ **_Collabwrite._**

It's simple, just drag your mouse and get the shape. Oooh, it even works with touch so it's compatible with your tablets too.

# Walkthrough

Demo Login Credentials:

email : [demo1@gmail.com](mailto:demo1@gmail.com), [demo2@gmail.com](mailto:demo2@gmail.com)

password: testpassword

### Creating an account

-   Head down to [https://collaboration-tool.vercel.app/login](https://collaboration-tool.vercel.app/login)
    
-   ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686608695814/069d6eac-d5e0-4c41-b7a9-249311b9c07c.png?auto=compress,format&format=webp)
    
-   You can either create an account or log in with the demo credentials. The Signup and Sign in actions are handled by Appwrite, so your credentials are secure.
    
-   Once you have signed up you will be automatically redirected to the dashboard.
    

### Navigating inside the dashboard

-   Once signed in I will be redirected to the dashboard page
    
-   ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686608972713/6627c89f-ed4e-46c9-8ac6-f76aa5b9d038.png?auto=compress,format&format=webp)
    
-   Once on the dashboard, you will be able to see your drawing boards.
    

### Creating a new project

-   To start a new project click on '+' button.
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686609215055/0a8214a7-5d4c-4ec3-bea1-9f5d751c28a6.png?auto=compress,format&format=webp)
    
-   you'll be greeted with a simple form, either to create a solo project or collaborate with others.
    
-   If you want to go solo, just enter the project name and click on **Get Started** button
    
-   Since collaboration is the core of Collabwrite, you will go through the collab route.
    
-   Once you enter the name of the project, you'll be prompted to enter the collaborator's email (who has already registered on Collabwrite).
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686657141747/bc05d2cc-5908-4318-80ca-fab2bd374a33.png?auto=compress,format&format=webp)
    
-   If the user is available their email will automatically be shown, which upon clicking will automatically send them the invite.
    
-   The other user will receive a notification to accept or decline the invite.
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686609857571/bc5a35f4-9e8c-482e-a0ba-4313930263eb.png?auto=compress,format&format=webp)
    
-   Upon accepting the request the user will automatically be added to the project.
    

### Drawing on the Canvas

-   Clicking on **Get Started** will launch the minimal canvas.
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686610335814/ba310246-dbae-4a6b-bf47-606471d3904d.png?auto=compress,format&format=webp)
    
-   The canvas contains drawing tools like arrows, squares, circles, lines, diamonds, text, and freehand on the top.
    
-   The colour palette is situated on the left side.
    
-   The right side contains the chat which can be minimized to use the entire canvas space. (chat is disabled in solo mode cuz whom I gonna chat with anyway)
    

### Drawing on the canvas

-   Drawing on the canvas is pretty straight forward just click on the shape then select the color and start away.
    
    ![](https://cdn.hashnode.com/res/hashnode/image/upload/v1686657993688/7d289414-0b52-4a6b-93a1-a2728e52fe2d.png?auto=compress,format&format=webp)
    

### Realtime Editing

One of the core features of Collabwrite is empowering numerous collaborators to engage in real-time editing on a project, drawing inspiration from the seamless collaboration experience of Figma.

Thanks to the incredible capabilities of Appwrite's realtime database, I have seamlessly integrated this remarkable feature into Collabwrite. To witness the magic in action
