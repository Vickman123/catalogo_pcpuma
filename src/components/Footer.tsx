import React from 'react';
import { ShieldCheck, Wifi, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      {/* Top Banner with UNAM Colors */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#002B7A] via-[#CFA02C] to-[#002B7A]"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Institutional Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#002B7A] flex items-center justify-center text-[#CFA02C] font-black text-xs border border-[#CFA02C]/40">
                UNAM
              </div>
              <div>
                <h4 className="text-white font-bold text-sm tracking-wide">
                  Programa PC PUMA
                </h4>
                <p className="text-xs text-slate-400">
                  Universidad Nacional Autónoma de México
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              El programa PC PUMA promueve el acceso universal a las tecnologías digitales mediante el préstamo de dispositivos de cómputo móvil de última generación y conectividad inalámbrica de alta velocidad para la comunidad académica universitaria.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-[#CFA02C] uppercase tracking-wider">
              Servicios Conectados
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.riu.unam.mx"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <Wifi className="w-3.5 h-3.5 text-sky-400" />
                  Red Inalámbrica Universitaria (RIU)
                </a>
              </li>
              <li>
                <a
                  href="https://www.comunidad.unam.mx"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  Cuentas de Correo Comunidad UNAM
                </a>
              </li>
              <li>
                <a
                  href="https://bidi.unam.mx"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  Biblioteca Digital UNAM (BiDi)
                </a>
              </li>
              <li>
                <a
                  href="https://dgtic.unam.mx"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  Dirección General de Cómputo (DGTIC)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact and Support */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-[#CFA02C] uppercase tracking-wider">
              Atención y Soporte
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#CFA02C] shrink-0" />
                <span>Módulos PC PUMA en Bibliotecas y Facultades</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#CFA02C] shrink-0" />
                <span>soporte.pcpuma@unam.mx</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#CFA02C] shrink-0" />
                <span>Mesa de Ayuda DGTIC</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} Universidad Nacional Autónoma de México (UNAM). Hecho en México. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Aviso de Privacidad</span>
            <span>•</span>
            <span>Términos de Préstamo Institucional</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
