package dashboards

import (
	"context"
	"fmt"
	"io/fs"
	"strings"

	pluginLib "github.com/grafana/grafana/pkg/plugins"
	"github.com/grafana/grafana/pkg/services/plugins"
	"github.com/grafana/grafana/pkg/util"
)

var _ FileStore = (*FileStoreManager)(nil)

type FileStoreManager struct {
	pluginStore plugins.Store
}

func ProvideFileStoreManager(pluginStore plugins.Store) *FileStoreManager {
	return &FileStoreManager{
		pluginStore: pluginStore,
	}
}

var openDashboardFile = func(p plugins.PluginDTO, name string) (fs.File, error) {
	return p.File(name)
}

func (m *FileStoreManager) ListPluginDashboardFiles(ctx context.Context, args *ListPluginDashboardFilesArgs) (*ListPluginDashboardFilesResult, error) {
	if args == nil {
		return nil, fmt.Errorf("args cannot be nil")
	}

	if len(strings.TrimSpace(args.PluginID)) == 0 {
		return nil, fmt.Errorf("args.PluginID cannot be empty")
	}

	plugin, exists := m.pluginStore.Plugin(ctx, args.PluginID)
	if !exists {
		return nil, plugins.NotFoundError{PluginID: args.PluginID}
	}

	references := []string{}
	for _, include := range plugin.DashboardIncludes() {
		references = append(references, include.Path)
	}

	return &ListPluginDashboardFilesResult{
		FileReferences: references,
	}, nil
}

func (m *FileStoreManager) GetPluginDashboardFileContents(ctx context.Context, args *GetPluginDashboardFileContentsArgs) (*GetPluginDashboardFileContentsResult, error) {
	if args == nil {
		return nil, fmt.Errorf("args cannot be nil")
	}

	if len(strings.TrimSpace(args.PluginID)) == 0 {
		return nil, fmt.Errorf("args.PluginID cannot be empty")
	}

	if len(strings.TrimSpace(args.FileReference)) == 0 {
		return nil, fmt.Errorf("args.FileReference cannot be empty")
	}

	plugin, exists := m.pluginStore.Plugin(ctx, args.PluginID)
	if !exists {
		return nil, plugins.NotFoundError{PluginID: args.PluginID}
	}

	var includedFile *pluginLib.Includes
	for _, include := range plugin.DashboardIncludes() {
		if args.FileReference == include.Path {
			includedFile = include
			break
		}
	}

	if includedFile == nil {
		return nil, fmt.Errorf("plugin dashboard file not found")
	}

	cleanPath, err := util.CleanRelativePath(includedFile.Path)
	if err != nil {
		// CleanRelativePath should clean and make the path relative so this is not expected to fail
		return nil, err
	}

	file, err := openDashboardFile(plugin, cleanPath)
	if err != nil {
		return nil, err
	}

	return &GetPluginDashboardFileContentsResult{
		Content: file,
	}, nil
}
