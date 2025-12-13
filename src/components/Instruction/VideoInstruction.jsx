import React, { useRef, useState, useEffect } from 'react';

const VideoInstruction = ({ 
  videoSrc, 
  title, 
  description, 
  poster,
  className = "",
  autoplay = false,
  controls = true 
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const controlsTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setVideoError(true);
      console.error('Ошибка загрузки видео:', videoSrc);
    };
    const handleLoadedData = () => {
      setVideoLoaded(true);
      setVideoError(false);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
      video.removeEventListener('loadeddata', handleLoadedData);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const handleSeek = (e) => {
    const newTime = e.target.value;
    setCurrentTime(newTime);
    videoRef.current.currentTime = newTime;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!document.fullscreenElement) {
      video.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  if (videoError) {
    return (
      <div className={`video-instruction ${className}`}>
        {title && <h3 className="video-title">{title}</h3>}
        {description && <p className="video-description">{description}</p>}
        
        <div className="video-error-container">
          <div className="video-error-content">
            <div className="video-error-icon">🚫</div>
            <h4>Не удалось загрузить видео</h4>
            <p>Видео по адресу {videoSrc} недоступно</p>
            <div className="video-error-tips">
              <p><strong>Возможные решения:</strong></p>
              <ul>
                <li>Проверьте подключение к интернету</li>
                <li>Убедитесь, что видео файл существует</li>
                <li>Попробуйте обновить страницу</li>
                <li>Свяжитесь с администратором</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`video-instruction ${className}`}>
      {title && <h3 className="video-title">{title}</h3>}
      {description && <p className="video-description">{description}</p>}
      
      <div
        className="video-container"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {!videoLoaded && (
          <div className="video-loading">
            <div className="video-loading-spinner"></div>
            <p>Загрузка видео...</p>
          </div>
        )}
        
        <video
          ref={videoRef}
          className="video-player"
          src={videoSrc}
          poster={poster}
          autoPlay={autoplay}
          controls={false}
          onClick={togglePlay}
          style={{ opacity: videoLoaded ? 1 : 0 }}
        />
        
        <div className={`video-controls ${showControls ? 'visible' : ''}`}>
          <button 
            className="video-control-btn play-pause-btn"
            onClick={togglePlay}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          
          <div className="video-progress">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="video-seek"
            />
            <span className="video-time">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
          
          <div className="video-volume">
            <span className="volume-icon">🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>
          
          <button 
            className="video-control-btn fullscreen-btn"
            onClick={toggleFullscreen}
          >
            ⛶
          </button>
        </div>
        
        {!isPlaying && (
          <div className="video-overlay" onClick={togglePlay}>
            <div className="play-button-large">▶️</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoInstruction;