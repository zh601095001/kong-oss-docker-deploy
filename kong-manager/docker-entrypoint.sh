#!/bin/sh
# 生成 kconfig.js 文件
cat <<EOF > /usr/share/nginx/html/kconfig.js
window.K_CONFIG = {
  ADMIN_API_URL: "${ADMIN_API_URL:-http://localhost:8001}",
  ADMIN_API_PORT: ${ADMIN_API_PORT:-8001},
  ADMIN_API_SSL_PORT: ${ADMIN_API_SSL_PORT:-8444},
  ADMIN_GUI_PATH: "${ADMIN_GUI_PATH:-/}",
  ANONYMOUS_REPORTS: ${ANONYMOUS_REPORTS:-false}
};
EOF

# 启动 nginx
exec "$@"
