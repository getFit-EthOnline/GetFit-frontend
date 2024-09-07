import { spicy } from "@/config/chains";
import Image from "next/image";
import { morphHolesky } from "viem/chains";
import { useAccount } from "wagmi";
import AlertComponent from "./AlertComponent";
import ButtonGroup from "./ButtonGroup";

export const Frame = ({
  image,
  title,
  buttons,
  handleClick,
  frameButtonUpdating,
  interactionsEnabled,
  showAlert,
  onClose,
  alertMessage,
  textInput,
  onTextInputChange,
  frameUrl,
}) => {
  const styles = {
    buttonContainer: {
      display: "flex",
      flexDirection: "column",
    },
    notSupported: {
      fontSize: "10px",
      textAlign: "center",
      width: "100%",
      display: "block",
    },
    buttonRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "4px",
    },
    button: {
      flex: 1,
      marginRight: "4px",
      backgroundColor: "white",
      border: "0px",
    },
    imageFrameA: {
      maxWidth: "300px",
      bottom: "0",
      right: "0",
      height: "auto",
      display: "block",
    },
    imageFrame: {
      width: "100%",
      bottom: "0",
      right: "0",
    },
    redirectIcon: {
      marginLeft: "5px", // Space between the button label and the icon
    },
    textInput: {
      width: "calc(100% - 8px)", // Adjusted to match the buttonRow width considering the marginRight
      outline: "none",
      boxShadow: "none",
    },
  };

  return (
    <>
      <AlertComponent
        show={showAlert}
        onClose={onClose}
        message={alertMessage}
      />
      <ImageFrame frameUrl={frameUrl} title={title} />
      {textInput !== undefined && (
        <input
          type="text"
          placeholder={textInput}
          onChange={onTextInputChange}
          style={styles.textInput}
        />
      )}
      <div style={styles.buttonContainer}>
        <ButtonGroup
          buttons={buttons}
          handleClick={handleClick}
          frameButtonUpdating={frameButtonUpdating}
        />
      </div>
      {!interactionsEnabled && (
        <span style={styles.notSupported}>
          Frame not fully supported by XMTP
        </span>
      )}
    </>
  );
};

const ImageFrame = ({ frameUrl, title }) => {
  const { chainId } = useAccount();
  const urlParams = new URLSearchParams(new URL(frameUrl).search);
  const name = urlParams.get("player");

  const imageSrc = name
    ? name.toLowerCase() === "conor"
      ? "/conor.png"
      : "/floyd.png"
    : chainId === spicy.id
    ? "https://www.chiliz.com/wp-content/uploads/2023/02/chiliz-logo-v3.svg"
    : "https://pbs.twimg.com/profile_images/1787467144914931712/3uIItkW0_400x400.jpg";

  console.log(chainId, "chainId");
  console.log(imageSrc, "imageSrc", name);
  return (
    <div>
      {chainId === spicy.id && (
        <div className="mx-auto flex items-center py-2 justify-center">
          <a href={frameUrl} target="_blank" rel="noopener noreferrer">
            <Image
              src={imageSrc}
              alt={title}
              width={260}
              height={170}
              className="mx-auto"
            />
          </a>
        </div>
      )}
      {chainId === morphHolesky.id && (
        <div className="mx-auto flex items-center py-2 justify-center">
          <a href={frameUrl} target="_blank" rel="noopener noreferrer">
            <Image
              src={imageSrc}
              width={290}
              height={170}
              className="mx-auto"
              alt={title}
            />
          </a>
        </div>
      )}
    </div>
  );
};
