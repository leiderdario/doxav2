import fs from 'fs';
import path from 'path';

// Rutas a los archivos package.json
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const rootPackagePath = path.join(__dirname, 'package.json');
const backendPackagePath = path.join(__dirname, 'backend', 'package.json');

// Leer los archivos package.json
const rootPackage = JSON.parse(fs.readFileSync(rootPackagePath, 'utf8'));
const backendPackage = JSON.parse(fs.readFileSync(backendPackagePath, 'utf8'));

// Función para fusionar dependencias
function mergeDependencies(target, source) {
  if (!source) return target;

  Object.keys(source).forEach(dep => {
    if (!target[dep]) {
      // Si la dependencia no existe en el destino, añadirla
      target[dep] = source[dep];
    } else if (target[dep] !== source[dep]) {
      // Si existe pero con versión diferente, usar la más reciente
      console.log(`Conflicto en ${dep}: root=${target[dep]}, backend=${source[dep]}`);

      // Comparamos versiones (método simple)
      // Asumimos que se usan versiones semánticas con el mismo formato
      if (source[dep].replace(/[\^~]/g, '') > target[dep].replace(/[\^~]/g, '')) {
        target[dep] = source[dep];
        console.log(`  Usando la versión de backend: ${source[dep]}`);
      } else {
        console.log(`  Manteniendo la versión de root: ${target[dep]}`);
      }
    }
  });

  return target;
}

// Fusionar dependencias
rootPackage.dependencies = mergeDependencies(
  rootPackage.dependencies || {},
  backendPackage.dependencies
);

rootPackage.devDependencies = mergeDependencies(
  rootPackage.devDependencies || {},
  backendPackage.devDependencies
);

// Fusionar scripts con prefijo "backend:"
const backendScripts = backendPackage.scripts || {};
rootPackage.scripts = rootPackage.scripts || {};

Object.keys(backendScripts).forEach(scriptName => {
  const newScriptName = `backend:${scriptName}`;
  rootPackage.scripts[newScriptName] = backendScripts[scriptName];
});

// Guardar el package.json actualizado
fs.writeFileSync(rootPackagePath, JSON.stringify(rootPackage, null, 2));

console.log('Fusión completada. Los archivos package.json se han combinado correctamente.');
console.log('Recuerda eliminar los archivos package.json y package-lock.json de la carpeta backend.');
console.log('Ejecuta "npm install" en la raíz del proyecto para actualizar las dependencias.');