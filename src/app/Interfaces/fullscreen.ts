export function toggleFullscreen() {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } 
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }