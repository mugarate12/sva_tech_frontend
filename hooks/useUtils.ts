import { useAlert } from './';

export default function useUtils() {
  const alert = useAlert();

  async function clipToClipboard(content: string, confirmationMessage: string) {
    if (typeof (navigator.clipboard) == 'undefined') {
      let textArea = document.createElement('textarea')
      
      textArea.value = content
      textArea.style.position = "fixed"
      document.body.appendChild(textArea)
  
      textArea.focus()
      textArea.select()
  
      document.execCommand('copy')
  
      document.body.removeChild(textArea)
      
      alert.notify(confirmationMessage, 'success');
    } else {
      await navigator.clipboard.writeText(content);
      alert.notify(confirmationMessage, 'success');
    }
  }

  return {
    clipToClipboard
  }
}