import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_SMTP_HOST,
  port: Number(process.env.MAILTRAP_SMTP_PORT),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.MAILTRAP_SMTP_USER,
    pass:process.env.MAILTRAP_SMTP_PASS,
  },
});


export const send_welcome_email = async(to: string) => {
    try {
        const info = await transporter.sendMail({
        from:'"Harsh From AI-ticket-Assistant" <harshmehta4951@gmail.com>',
        to: to,
        subject:"Welcome to AI Ticket Assistant",
        html:`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to AI Ticket Assistant</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            animation: slideUp 0.6s ease-out;
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .header {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: pulse 4s ease-in-out infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 0.8; }
        }
        
        .header h1 {
            color: white;
            font-size: 2.2em;
            margin-bottom: 10px;
            font-weight: 700;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            position: relative;
            z-index: 2;
        }
        
        .header .subtitle {
            color: rgba(255, 255, 255, 0.9);
            font-size: 1.1em;
            font-weight: 300;
            position: relative;
            z-index: 2;
        }
        
        .ai-icon {
            display: inline-block;
            width: 60px;
            height: 60px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            position: relative;
            z-index: 2;
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 255, 255, 0.3);
            animation: rotate 3s linear infinite;
        }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .welcome-message {
            font-size: 1.2em;
            color: #2c3e50;
            margin-bottom: 30px;
            text-align: center;
            font-weight: 500;
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .feature-card {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 25px;
            border-radius: 10px;
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid #dee2e6;
            position: relative;
            overflow: hidden;
        }
        
        .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(74, 172, 254, 0.1), transparent);
            transition: left 0.5s ease;
        }
        
        .feature-card:hover::before {
            left: 100%;
        }
        
        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .feature-icon {
            font-size: 2.5em;
            margin-bottom: 15px;
            display: block;
        }
        
        .feature-title {
            font-size: 1.2em;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 10px;
        }
        
        .feature-description {
            color: #6c757d;
            font-size: 0.95em;
        }
        
        .cta-section {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 30px -30px -40px -30px;
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        
        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            color: white;
            padding: 15px 35px;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.1em;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(238, 90, 36, 0.3);
            position: relative;
            overflow: hidden;
        }
        
        .cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s ease;
        }
        
        .cta-button:hover::before {
            left: 100%;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(238, 90, 36, 0.4);
        }
        
        .tech-badges {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            margin: 25px 0;
        }
        
        .tech-badge {
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.85em;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            animation: fadeInUp 0.6s ease-out;
            animation-fill-mode: both;
        }
        
        .tech-badge:nth-child(1) { animation-delay: 0.1s; }
        .tech-badge:nth-child(2) { animation-delay: 0.2s; }
        .tech-badge:nth-child(3) { animation-delay: 0.3s; }
        .tech-badge:nth-child(4) { animation-delay: 0.4s; }
        .tech-badge:nth-child(5) { animation-delay: 0.5s; }
        .tech-badge:nth-child(6) { animation-delay: 0.6s; }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .footer {
            text-align: center;
            padding: 20px;
            color: rgba(255, 255, 255, 0.8);
            font-size: 0.9em;
        }
        
        .divider {
            height: 2px;
            background: linear-gradient(90deg, transparent, #4facfe, transparent);
            margin: 20px 0;
        }
        
        @media (max-width: 600px) {
            .email-container {
                margin: 10px;
                border-radius: 8px;
            }
            
            .header {
                padding: 30px 20px;
            }
            
            .header h1 {
                font-size: 1.8em;
            }
            
            .content {
                padding: 30px 20px;
            }
            
            .feature-grid {
                grid-template-columns: 1fr;
                gap: 15px;
            }
            
            .cta-section {
                margin: 20px -20px -30px -20px;
                padding: 30px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="ai-icon">🤖</div>
            <h1>Welcome to AI Ticket Assistant!</h1>
            <p class="subtitle">Your Personal Coding Support Hub</p>
        </div>
        
        <div class="content">
            <p class="welcome-message">
                Get ready to supercharge your coding journey! Our AI-powered ticket system connects you with expert developers who are ready to help solve your coding challenges.
            </p>
            
            <div class="divider"></div>
            
            <div class="feature-grid">
                <div class="feature-card">
                    <span class="feature-icon">🎫</span>
                    <h3 class="feature-title">Smart Ticketing</h3>
                    <p class="feature-description">Raise tickets for any coding question and get matched with the right expert instantly</p>
                </div>
                
                <div class="feature-card">
                    <span class="feature-icon">👨‍💻</span>
                    <h3 class="feature-title">Expert Network</h3>
                    <p class="feature-description">Access our network of specialized developers across multiple programming languages</p>
                </div>
                
                <div class="feature-card">
                    <span class="feature-icon">⚡</span>
                    <h3 class="feature-title">Fast Response</h3>
                    <p class="feature-description">Get quick, accurate solutions to keep your projects moving forward</p>
                </div>
                
                <div class="feature-card">
                    <span class="feature-icon">🔍</span>
                    <h3 class="feature-title">Detailed Solutions</h3>
                    <p class="feature-description">Receive comprehensive explanations and code examples for better understanding</p>
                </div>
            </div>
            
            <div class="tech-badges">
                <span class="tech-badge">JavaScript</span>
                <span class="tech-badge">Python</span>
                <span class="tech-badge">React</span>
                <span class="tech-badge">Node.js</span>
                <span class="tech-badge">Java</span>
                <span class="tech-badge">C++</span>
            </div>
            
            <div class="divider"></div>
            
            <h2 style="text-align: center; color: #2c3e50; margin-bottom: 20px;">How It Works</h2>
            <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin: 20px 0;">
                <ol style="color: #495057; font-size: 1.05em; line-height: 1.8;">
                    <li style="margin-bottom: 10px;"><strong>Submit Your Question:</strong> Create a ticket with your coding problem or question</li>
                    <li style="margin-bottom: 10px;"><strong>AI Routing:</strong> Our AI analyzes your question and routes it to the most suitable expert</li>
                    <li style="margin-bottom: 10px;"><strong>Expert Response:</strong> Receive detailed solutions and explanations from experienced developers</li>
                    <li><strong>Learn & Grow:</strong> Apply the solutions and enhance your coding skills</li>
                </ol>
            </div>
        </div>
        
        <div class="cta-section">
            <h2 style="margin-bottom: 15px; font-size: 1.5em;">Ready to Get Started?</h2>
            <p style="margin-bottom: 25px; opacity: 0.9;">Submit your first coding question and experience the power of expert assistance!</p>
            <a href="#" class="cta-button">Create Your First Ticket</a>
            
            <div class="footer">
                <p>Need help getting started? Reply to this email and we'll guide you through the process.</p>
                <p style="margin-top: 10px;">Happy Coding! 🚀</p>
            </div>
        </div>
    </div>
</body>
</html>`
    })

    console.log("Message sent: ", info.messageId);
    } catch (error) {
        console.log("Mail not send ", error);
        throw error;
    }
}