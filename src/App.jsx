import { useState, useRef, useEffect } from 'react'
import { removeBackground } from '@imgly/background-removal'
import { UploadCloud, Scissors, Download, RefreshCw, Sparkles, ImagePlus, Github } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('')
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) setupFile(selectedFile)
  }

  const setupFile = (file) => {
    setFile(URL.createObjectURL(file))
    setResult(null)
    setIsProcessing(false)
    setProgress(0)
    window.currentFile = file // Keep reference for processing
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setupFile(droppedFile)
    }
  }

  // Handle Clipboard Paste
  useEffect(() => {
    const handlePaste = (e) => {
      const item = e.clipboardData.items[0]
      if (item && item.type.startsWith('image/')) {
        const file = item.getAsFile()
        setupFile(file)
      }
    }

    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [])

  const handleSampleSelect = async (name) => {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}samples/${name}.png`)
      const blob = await response.blob()
      const file = new File([blob], `${name}.png`, { type: 'image/png' })
      setupFile(file)
    } catch (error) {
      console.error('Error loading sample:', error)
    }
  }

  const handleProcess = async () => {
    if (!window.currentFile) return
    setIsProcessing(true)
    setProgress(0)
    setStatus('កំពុងរៀបចំ AI Model...')

    /**
     * CRITICAL: Official stable CDN for WASM and model files.
     */
    // Robust path resolution for both local and production (Vercel)
    const baseUrl = import.meta.env.BASE_URL
    const publicPath = new URL(`${baseUrl}background-removal/`, window.location.href).href

    const config = {
      publicPath,
      progress: (key, current, total) => {
        const percentage = Math.round((current / total) * 100)
        setProgress(percentage)
        if (key.includes('fetch')) setStatus(`កំពុងទាញយក AI Model... ${percentage}%`)
        else if (key.includes('inference')) setStatus(`កំពុងវិភាគ និង Processing រូបភាព... ${percentage}%`)
        else setStatus(`កំពុងរៀបចំលទ្ធផល... ${percentage}%`)
      }
    }

    try {
      const blob = await removeBackground(window.currentFile, config)
      setResult(URL.createObjectURL(blob))
      setIsProcessing(false)
    } catch (error) {
      console.error(error)
      setStatus('បញ្ហា: ' + error.message)
      setIsProcessing(false)
    }
  }

  const reset = () => {
    setFile(null)
    setResult(null)
    setIsProcessing(false)
    setProgress(0)
    setStatus('')
  }

  return (
    <div className="container">
      <header>
        <motion.div 
          className="header-top"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="title-group">
            <h1>ClearCut</h1>
            <span className="version-badge">v1.0.0</span>
          </div>
          <a 
            href="https://github.com/Lachsokhour/clearcut" 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-link"
            title="View on GitHub"
          >
            <Github size={20} />
          </a>
        </motion.div>
        <motion.p 
          className="tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          បទពិសោធន៍ថ្មីក្នុងការលុបផ្ទៃខាងក្រោយ៖ ស្អាត រហ័ស និងរក្សាឯកជនភាព ១០០% ក្នុង Browser របស់អ្នក។
        </motion.p>
      </header>

      <main className="glass-card">
        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div 
              key="upload"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              id="upload-section"
            >
              <div 
                className="upload-zone" 
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange} 
                  accept="image/*" 
                  style={{ display: 'none' }} 
                />
                <div className="icon-box">
                  <UploadCloud size={40} />
                </div>
                <div className="upload-title">ចាប់ផ្ដើមលុបផ្ទៃខាងក្រោយនៅទីនេះ</div>
                <p className="upload-hint">គាំទ្រ PNG, JPG ឬ WEBP (ទំហំរហូតដល់ ២០MB) ឬបិទភ្ជាប់ដោយ Ctrl+V</p>
                <button className="btn-browse" type="button">ជ្រើសរើសរូបភាពពីឧបករណ៍</button>
              </div>

              <div className="sample-section">
                <div className="sample-header">
                  <div className="sample-line"></div>
                  <span>ឬជ្រើសរើសរូបភាពគំរូ</span>
                  <div className="sample-line"></div>
                </div>
                <div className="sample-grid">
                  {[
                    { id: 'person', label: 'រូបភាពមនុស្ស', icon: '👤' },
                    { id: 'pet', label: 'សត្វចិញ្ចឹម', icon: '🐕' },
                    { id: 'object', label: 'ផលិតផល/វត្ថុ', icon: '👜' }
                  ].map((sample) => (
                    <motion.div 
                      key={sample.id}
                      className="sample-card"
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSampleSelect(sample.id)}
                    >
                      <div className="sample-thumb">
                        <img src={`${import.meta.env.BASE_URL}samples/${sample.id}.png`} alt={sample.label} />
                        <div className="sample-overlay">
                          <span>តោះ! សាកល្បង</span>
                        </div>
                      </div>
                      <span className="sample-label">{sample.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="workspace"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              id="workspace-container"
            >
              <div className="workspace">
                <div className="viewport">
                  <div className="viewport-label">រូបភាពដើម</div>
                  <img src={file} alt="រូបភាពដើម" />
                </div>
                
                <div className="viewport checkerboard">
                  <div className="viewport-label">លទ្ធផលសម្រេច</div>
                  
                  {isProcessing && (
                    <div className="progress-overlay">
                      <div className="icon-box">
                        <Sparkles size={40} className="shimmer-icon" />
                      </div>
                      <div className="status-text shimmer-text">{status}</div>
                      <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  )}

                  {result && <img src={result} alt="លទ្ធផល" />}
                  {!result && !isProcessing && (
                    <div className="empty-prompt">
                      <p>រូបភាពរបស់អ្នករួចរាល់សម្រាប់ការផ្លាស់ប្តូរ</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="actions">
                {!result ? (
                  <button 
                    className="btn btn-primary" 
                    onClick={handleProcess}
                    disabled={isProcessing}
                  >
                    <Scissors size={18} /> {isProcessing ? 'កំពុងដំណើរការ...' : 'ចាប់ផ្ដើមលុបផ្ទៃខាងក្រោយ'}
                  </button>
                ) : (
                  <a 
                    href={result} 
                    download={`clearcut-${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}.png`} 
                    className="btn btn-success"
                  >
                    <Download size={18} /> ទាញយក PNG
                  </a>
                )}
                <button className="btn btn-outline" onClick={reset} disabled={isProcessing}>
                  <RefreshCw size={18} /> {result ? 'សាកល្បងម្ដងទៀត' : 'បោះបង់'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="privacy-features"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="feature">
            <div className="feature-icon"><Sparkles size={20} /></div>
            <div className="feature-text">
              <h3>បច្ចេកវិទ្យា AI ជំនាន់ចុងក្រោយ</h3>
              <p>រាល់ការកែច្នៃរូបភាពធ្វើឡើងក្នុងឧបករណ៍របស់អ្នកផ្ទាល់ ដោយមិនបញ្ជូនទៅកាន់ Server ឡើយ</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-icon"><ImagePlus size={20} /></div>
            <div className="feature-text">
              <h3>សុវត្ថិភាព និងឯកជនភាពកម្រិតខ្ពស់</h3>
              <p>រូបភាពរបស់អ្នកត្រូវបានរក្សាការសម្ងាត់បំផុត ជាមួយដំណើរការផ្ទាល់ក្នុង Browser របស់អ្នក</p>
            </div>
          </div>
        </motion.div>
      </main>

      <footer>
        <p>© ២០២៦ ClearCut។ ឯកជនភាពរបស់អ្នកគឺជាអាទិភាពចម្បង៖ រាល់ទិន្នន័យទាំងអស់មិនត្រូវបានបញ្ជូនចេញពីឧបករណ៍របស់អ្នកឡើយ។</p>
      </footer>
    </div>
  )
}

export default App
