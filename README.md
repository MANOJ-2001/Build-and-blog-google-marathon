### **Detecting the Undetectable: Malware Analysis with Gemini AI**

![image](https://github.com/user-attachments/assets/da64c523-b23a-43a3-ae14-278a5363458a)

In a world where data is the new oil, malware is the sneaky pipeline hackers use to siphon it off. Over the last two days, I embarked on a journey to understand, dissect, and fight malware. From building a system to analyze suspected files to showcasing how malicious software operates, this adventure has been as enlightening.

Before we talk about fighting malware, it’s essential to understand what we’re up against. Malware isn’t just a single kind of threat — it’s an entire arsenal of tools designed to infiltrate, manipulate, and exploit systems. From silent spies to destructive saboteurs, malware comes in many forms, each more cunning than the last.

Trojans: Malware disguised as legitimate software, often used to steal data, monitor behavior, or gain unauthorized access to systems.
Keyloggers: Tools that silently record keystrokes, capturing sensitive information like passwords and financial details.
Social Engineering Attacks: Psychological manipulation tactics, such as phishing and baiting, tricking users into compromising their own security.
Spyware: Software designed to spy on a user’s activities, from tracking browser habits to stealing credentials.
Ransomware: Programs that lock users out of their systems or data, demanding payment for their release.
Here’s a recount of what I achieved and how this project unfolded.
Building the Frontend — Where It All Begins
The foundation of the system started with the frontend — a clean and intuitive interface that allowed users to upload files they suspected might be malicious. Simplicity and functionality were key. After all, if users couldn’t upload their files easily, the whole process would crumble at the first step.

Secure File Storage in the Cloud
Once a file was uploaded, it needed a safe and secure home. That’s where the cloud storage bucket came in. This acted as a digital vault for the files, storing them securely while tagging each with identifiers to prepare them for analysis.

Pulling Files to the VM — The Backend Workhorse
With the frontend and storage set up, the next challenge was to bring those files into a secure environment for analysis. Enter the Virtual Machine (VM). Using a service account token, I configured the VM to fetch files from the cloud storage bucket. This setup ensured all analysis was performed in an isolated environment, safeguarding both the users and the system from potential malware impact.

![image](https://github.com/user-attachments/assets/5b5b18f1-c40b-40b4-a197-66cc023d8131)

pulling the suspicious exe to VM

The Real Work Begins
Metadata Extraction — Lifting the Mask
Every file carries hidden clues — its name, size, digital signature, and even its intentions if you know where to look. With tools like Radare2, I extracted key metadata that painted an initial picture of the file. Was it signed by a legitimate organization? Did the file size match expectations? These details, while subtle, could reveal whether the file was simply another harmless application or something more sinister.

![image](https://github.com/user-attachments/assets/69155a93-3774-4a22-98eb-eafc24722238)

Metadata Extraction

Beyond Metadata — Watching the Suspect
Metadata is just the tip of the iceberg. The real detective work involved observing how the application behaved post-installation. Tools like Wireshark were deployed to monitor network calls. For instance, if a file claimed to be a Google Chrome executable, you’d expect it to connect to Google’s servers. But what if it started sending requests to suspicious third-party servers? That’s an immediate red flag.

Similarly, I tracked the application’s RAM usage, CPU load, and any attempts to modify critical system files. These behavioral traits could expose the file’s true nature, no matter how well-disguised it was.

![image](https://github.com/user-attachments/assets/e4a14ed3-8978-42c1-8b76-6e82707f131c)

sending Behavioral data to Gemini

**Enter Gemini AI — The Cyber Detective**

![image](https://github.com/user-attachments/assets/a5725ef5-ba25-4e12-9f72-d6d77351c570)

Final result the end user will see after gemini’s response

With all the data in hand — metadata, network behavior, and system impact — it was time to call in the expert: Gemini AI. Think of Gemini as a forensic analyst with an AI-powered microscope. It evaluated every byte of data, from network logs to memory usage, and returned a malware likelihood score on a scale of 1 to 10.

This holistic analysis gave a clear metric for users to act upon. A low score suggested the file was likely safe, while a high score meant it was time to reach for the cybersecurity emergency kit.

Going the Extra Mile — The Importance of Behavioral Analysis
One of the critical lessons I implemented in this project was to never rely on surface-level data alone. Malware today is designed to deceive. A file might look legitimate, like a genuine Google Chrome installer, but once installed, its behavior can reveal the truth.

Network Monitoring: Using Wireshark, I logged all outgoing and incoming connections. Any call to a suspicious server raised an alert.
Resource Utilization: Spikes in RAM or CPU usage, especially for lightweight apps, were another key indicator of malicious intent.
File System Changes: Attempting to alter system files or install additional payloads provided conclusive evidence of malware.
The Big Picture
This project wasn’t just about pulling metadata or monitoring connections. It was about combining tools, automation, and AI to create a comprehensive system. Each step — from file upload to Gemini’s final score — worked together like gears in a machine.

The result? A streamlined, efficient malware detection pipeline that went beyond the surface to unmask malicious files, ensuring users stayed a step ahead of the attackers.

While this was only a two-day sprint, it set the stage for what’s possible with the right mix of technology, focus, and a dash of curiosity. As the cybersecurity landscape evolves, projects like this are more crucial than ever.

Conclusion: Stay Vigilant, Stay Safe
Malware is a clever and relentless adversary, but with the right tools and awareness, it can be outsmarted. Always verify applications, monitor unusual behavior like network activity and resource usage, and leverage AI-driven analysis like Gemini to stay ahead of potential threats.

![image](https://github.com/user-attachments/assets/f68f4b89-13df-4d33-81e8-0f2ed6350962)

Only you can !!

The key is layering your defenses — combine technology, vigilance, and informed decision-making. Malware evolves, but so can we. Stay curious, cautious, and one step ahead. In cybersecurity, proactive defense is the ultimate offense.
