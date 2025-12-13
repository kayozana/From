<script>
  let { onLogin } = $props();

  let email = $state('');
  let password = $state('');
  let isRegistering = $state(false);
  let nombre = $state('');

  function handleSubmit() {
    if (!email || !password) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (isRegistering && !nombre) {
      alert('Por favor ingresa tu nombre');
      return;
    }

    // Aquí irá la llamada a la API
    // Por ahora solo simulamos el login
    onLogin?.();
  }
</script>

<style>
  .login-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .login-box {
    background: #1e293b;
    border-radius: 20px;
    padding: 48px;
    max-width: 450px;
    width: 100%;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  }

  .logo {
    text-align: center;
    margin-bottom: 40px;
  }

  .logo-icon {
    font-size: 4rem;
    margin-bottom: 16px;
  }

  h1 {
    color: white;
    font-size: 2rem;
    margin: 0 0 12px;
    text-align: center;
  }

  .subtitle {
    color: #94a3b8;
    text-align: center;
    margin-bottom: 32px;
  }

  .tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 32px;
  }

  .tab {
    padding: 12px;
    background: transparent;
    border: 2px solid #334155;
    border-radius: 10px;
    color: #94a3b8;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .tab:hover {
    border-color: #475569;
  }

  .tab.active {
    background: #3b82f6;
    border-color: #3b82f6;
    color: white;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 8px;
    color: #cbd5e1;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 14px 16px;
    background: #0f172a;
    border: 1px solid #334155;
    border-radius: 10px;
    color: #e2e8f0;
    font-size: 1rem;
    transition: all 0.2s;
  }

  input::placeholder {
    color: #64748b;
  }

  input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .submit-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #10b981, #059669);
    border: none;
    border-radius: 10px;
    color: white;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 12px;
  }

  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
  }
</style>

<div class="login-container">
  <div class="login-box">
    <div class="logo">
      <div class="logo-icon">💼</div>
      <h1>Bienvenido a EMS</h1>
      <p class="subtitle">Gestiona tus finanzas con inteligencia</p>
    </div>

    <div class="tabs">
      <button
        class="tab"
        class:active={!isRegistering}
        onclick={() => isRegistering = false}
      >
        Iniciar Sesión
      </button>
      <button
        class="tab"
        class:active={isRegistering}
        onclick={() => isRegistering = true}
      >
        Registrarse
      </button>
    </div>

    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      {#if isRegistering}
        <div class="form-group">
          <label for="nombre">Nombre Completo</label>
          <input
            id="nombre"
            type="text"
            placeholder="Tu nombre"
            bind:value={nombre}
          />
        </div>
      {/if}

      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input
          id="email"
          type="email"
          placeholder="ejemplo@correo.com"
          bind:value={email}
        />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          bind:value={password}
        />
      </div>

      <button type="submit" class="submit-btn">
        {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
      </button>
    </form>
  </div>
</div>