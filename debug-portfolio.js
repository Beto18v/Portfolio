// Debug script para verificar que todo se carga correctamente
console.log('🚀 Portfolio Debug Started');

// Verificar que Vue está montado
setTimeout(() => {
    console.log('🔍 Checking DOM...');

    // Verificar si el componente principal está montado
    const portfolioElement = document.querySelector('.revolutionary-portfolio-container');
    console.log('📦 Revolutionary Portfolio Container:', portfolioElement);

    // Verificar si hay errores en la consola
    console.log('✅ If you see this message, Vue is working!');

    // Verificar componentes específicos
    const holoTerminal = document.querySelector('.holo-terminal');
    const spaceModules = document.querySelector('.space-modules');
    const quantumProfile = document.querySelector('.quantum-profile');

    console.log('🖥️ Holo Terminal:', holoTerminal);
    console.log('🌌 Space Modules:', spaceModules);
    console.log('⚛️ Quantum Profile:', quantumProfile);
}, 2000);
