// Defines the structure for input fields associated with an action.
interface ActionInputFields {
  name: string; // Unique identifier for the input field
  placeholder?: string; // Optional placeholder text to display in the input field
  required?: boolean; // Optional flag indicating if the input field is required (defaults to false)
}

// Enumerates the different types of actions that can be performed.
export enum ActionLinkType {
  TX = "tx", // Represents a transaction action
  SIGNATURE = "signature", // Represents a signature action
  LINK = "link", // Represents a hyperlink action
  ONE_CLICK_LOGIN = "one-click-login", // Represents a one-click login action
}

// Defines the structure for links associated with an action, detailing how the action is executed.
interface ActionLink {
  targetUrl: string; // The primary URL associated with the action (e.g., for navigation or POST requests)
  postUrl?: string; // Optional URL for a POST request to be made after the action is executed
  label: string; // Human-readable text describing the action
  type: ActionLinkType; // The type of action, as defined in the ActionLinkType enum
  inputFields?: ActionInputFields[]; // Optional array of input fields required for the action
}

// Represents the overall structure of an EVM (Ethereum Virtual Machine) action, including metadata and actionable links.
export interface EVMAction {
  title: string; // The title of the EVM Action, typically displayed as a header
  description: string; // A brief description of what the EVM Action entails
  image: string; // URL to an image representing the EVM Action visually
  links: ActionLink[]; // An array of ActionLink objects, defining the actionable elements associated with the EVM Action
  label: string; // A label for the EVM Action, possibly used as button text or similar
}
