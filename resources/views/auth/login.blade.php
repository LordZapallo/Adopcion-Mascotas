@extends('layouts.app')

@section('content')
<div class="login-box card">
    <div class="card-body">
      <form class="form-horizontal form-material" method="POST" action="{{ route('login') }}">
        @csrf
        <a href="javascript:void(0)" class="text-center db">
          <img src="/imagenes/avt.png" alt="Home" style="width: 100%; !important"/>
        </a>
            <div class="form-group m-t-40">
                <div class="col-xs-12">
                    <input class="form-control @error('email') is-invalid @enderror" type="email" name="email" required autocomplete="email" autofocus placeholder="Correo electrónico" />
                    @error('email')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
            </div>
            <div class="form-group">
                <div class="col-xs-12">
                    <input class="form-control @error('password') is-invalid @enderror" type="password" name="password" required autocomplete="current-password" placeholder="Contraseña" />
                    @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                    @enderror
                </div>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }} style="display:none;">
                <label class="form-check-label" for="remember">
                    Recordar Usuario
                </label>
            </div>
        <div class="form-group text-center m-t-20 mt-5">
          <div class="col-xs-12">
            <button
              class="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light"
              type="submit"
            >Ingresar</button>
          </div>
        </div>
      </form>
    </div>
  </div>
@endsection
