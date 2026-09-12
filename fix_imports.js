const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next')) {
        results = results.concat(walk(file));
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src');
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let newContent = content
    .replace(/@\/components\/Navbar/g, '@/components/layout/Navbar')
    .replace(/@\/components\/Identity/g, '@/components/layout/Identity')
    .replace(/@\/components\/ScoutShields/g, '@/components/home/ScoutShields')
    .replace(/@\/components\/HallOfFame/g, '@/components/home/HallOfFame')
    .replace(/@\/components\/Sessions/g, '@/components/home/Sessions')
    .replace(/@\/components\/JoinForm/g, '@/components/home/JoinForm')
    .replace(/@\/components\/MediaGallery/g, '@/components/gallery/MediaGallery')
    .replace(/@\/components\/FullGallery/g, '@/components/gallery/FullGallery')
    .replace(/@\/components\/ClanTree/g, '@/components/clan/ClanTree')
    .replace(/@\/components\/PersonCard/g, '@/components/clan/PersonCard')
    .replace(/@\/components\/TrafficTracker/g, '@/components/analytics/TrafficTracker')
    .replace(/@\/app\/actions/g, '@/actions');

  // Fix AdminDashboardClient relative imports
  if (f.includes('AdminDashboardClient')) {
     newContent = newContent.replace(/from '\.\.\/actions'/g, `from '@/app/admin/requests/actions'`);
     newContent = newContent.replace(/from '\.\.\/events/g, `from '@/app/admin/events`);
     newContent = newContent.replace(/from '\.\.\/people/g, `from '@/app/admin/people`);
  }
  
  if (f.includes('AdminSidebar')) {
     newContent = newContent.replace(/from '\.\.\/requests\/actions'/g, `from '@/app/admin/requests/actions'`);
  }

  // Also fix imports in admin/layout.tsx and admin/page.tsx
  if (f.includes('admin\\\\layout.tsx') || f.includes('admin/layout.tsx')) {
    newContent = newContent.replace(/from '\.\/components\/AdminSidebar'/g, `from '@/components/admin/AdminSidebar'`);
  }
  if (f.includes('admin\\\\page.tsx') || f.includes('admin/page.tsx')) {
    newContent = newContent.replace(/from '\.\/components\/AdminDashboardClient'/g, `from '@/components/admin/AdminDashboardClient'`);
  }

  if (content !== newContent) {
    fs.writeFileSync(f, newContent, 'utf8');
  }
});
