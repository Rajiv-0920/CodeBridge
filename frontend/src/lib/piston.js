// Piston API is a service for code execution
const PISTON_API = 'https://emkc.org/api/v2/piston'

const LANGUAGE_VERSIONS = {
  javascript: { language: 'javascript', version: '18.15.0' },
  python: { language: 'python', version: '3.10.0' },
  java: { language: 'java', version: '15.0.2' },
}

/**
 * @param { string } language - programming language
 * @param { string } code - source code to execute
 * @returns {Promise<{success:boolean, output?:string, error?:string}>}
 */
export const executeCode = async (language, code) => {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language]
    if (!languageConfig) {
      return { success: false, error: `Unsupported language: ${language}` }
    }

    const response = await fetch(`${PISTON_API}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: languageConfig.language,
        version: languageConfig.version,
        files: [{ name: `main.${getFileExtension(language)}`, content: code }],
      }),
    })

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      }
    }

    // --- THE FIX IS HERE ---
    // You must await response.json()
    const data = await response.json()

    console.log('API Response:', data) // Debugging log

    // Safety check: ensure 'run' property exists before accessing it
    if (!data.run) {
      return {
        success: false,
        error: data.message || 'Execution failed: Invalid server response',
      }
    }

    const output = data.run.output || ''
    const stderr = data.run.stderr || ''

    // Check if the process exited with an error code (non-zero)
    // or if there is critical stderr output
    if (data.run.code !== 0 || stderr) {
      return { success: false, output: output, error: stderr || output }
    }

    return { success: true, output: output || 'No output' }
  } catch (error) {
    console.error('Execute Code Error:', error)
    return { success: false, error: `Failed to execute code: ${error.message}` }
  }
}

export const getFileExtension = (language) => {
  const extensions = {
    javascript: 'js',
    java: 'java',
    python: 'py',
  }
  return extensions[language] || 'txt'
}
