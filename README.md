# TextVault

TextVault is a simple, open-source text sharing web application built using Next.js. It allows you to easily share text data with others by generating a unique URL that can be accessed from any web browser. TextVault now includes password protection and client-side encryption for enhanced security.

## Features

* Share text data with others by generating a unique URL
* Password protection for shared text data
* Client-side encryption for enhanced security
* Clean and simple user interface
* Built using Next.js for fast and reliable performance

## Getting Started

To get started with TextVault, follow these steps:

1. Clone the repository to your local machine:
```bash
git clone https://github.com/VenkatLohithDasari/TextVault.git
```
2. Install the required dependencies:
```
npm install
```
3. Start the development server:
```
npm run dev
```
4. Open your web browser and navigate to `http://localhost:3000` to start using TextVault.

## Password Protection

TextVault now supports password protection for shared text data. When creating a new text entry, you have the option to set a password. If a password is provided, the shared text will be encrypted using the password, and anyone accessing the URL will be required to enter the correct password to view the content.

## Client-Side Encryption

In addition to password protection, TextVault implements client-side encryption for enhanced security. When a password is set for a text entry, the content is encrypted using the password on the client-side before being sent to the server. This ensures that the content remains secure and can only be decrypted by someone with the correct password.

## Upcoming Features

TextVault is actively being developed, and the following features are planned for future releases:

* Automatic link expiration
* Customizable link expiration times
* Syntax highlighting for code snippets
* Improved user interface and user experience

Stay tuned for updates and new features!

## Contributing

TextVault is an open-source project, and contributions from the community are welcome! If you would like to contribute to the project, please submit a pull request with your proposed changes.

## License

TextVault is licensed under the MIT License. See the `LICENSE` file for more information.

## Acknowledgements

TextVault was inspired by other text sharing services such as Pastebin and Rentry, and built using the Next.js framework. Special thanks to the creators and maintainers of these projects for their inspiration and support.